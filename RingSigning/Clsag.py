# Concise Linkable Spontaneous Anonymous Group signatures
# minified version

# I tried to find the compromise between following three ideas
# - use as simple python syntax as possible
# - use as close to mathematical notation syntax as possible (extensive use of list comprehensions)
# - stay as close to zero-to-monero paper as possible

import secrets
from Ed25519Curve import EC, H_n, H_p

# SET PARAMS
b, G, ord_G = EC.b, EC.G, EC.ord_G
# n = 5
# m = 1
# n = number of ring members
# m = number of private keys per ring member


privPoolHex = [
    "ec922a542ed7817ed96fe339e67beddbc063d9fe2400863922acff6291b781a7",
    "993269fb9d62c5002e81a87b8c55b5b7871d78ad1d0b3a80f8ee8823f1032982",
    "0027ba1cc197678fa3b69865535e6023152bad7f82fd012cc20a86d4948e7a4e",
    "77c83237d60dd8f9522b615023762882c3f665a39951595d58ff868e8d454bc6",
    "87485a43a1050fa58e6b4cc9a6e894154f5e3217dd7c911be5465079471d738f",
]

privPool = [int(priv, 16) for priv in privPoolHex]
publicPool = [[priv * G] for priv in privPool]


# k = [[secrets.randbelow(ord_G) for _ in range(m)] for _ in range(n - 1)]
# K = [[k[i][j] * G for j in range(m)] for i in range(n - 1)]

idx = 2
signerPriv = privPool[idx]


def sign(msg, k_pi, G, K, pi=-1, K_pi=None):
    m = 1
    n = len(K)
    if pi == -1 and K_pi != None:
        pi = secrets.randbelow(n)
        K.insert(pi, K_pi)
    inter = K[pi][0]
    K_tilde = [k_pi[j] * H_p(K[pi][0]) for j in range(m)]
    a = secrets.randbelow(ord_G)
    r = [secrets.randbelow(ord_G) if i != pi else None for i in range(n)]

    W = [
        sum([H_n([f"CLSAG_{j}"] + K + K_tilde) * K[i][j] for j in range(m)], start=EC.O)
        for i in range(n)
    ]
    W_tilde = sum(
        [H_n([f"CLSAG_{j}"] + K + K_tilde) * K_tilde[j] for j in range(m)], start=EC.O
    )
    w_pi = sum([H_n([f"CLSAG_{j}"] + K + K_tilde) * k_pi[j] for j in range(m)])

    c = [
        H_n(f"CLSAG_c", K, msg, a * G, a * H_p(K[pi][0])) if i == (pi + 1) % n else None
        for i in range(n)
    ]
    for i in [(pi + i) % n for i in range(1, n)]:
        c[(i + 1) % n] = H_n(
            f"CLSAG_c",
            K,
            msg,
            r[i] * G + c[i] * W[i],
            r[i] * H_p(K[i][0]) + c[i] * W_tilde,
        )

    r[pi] = (a - c[pi] * w_pi) % ord_G
    return (c[0], r, K_tilde, K)


def verify(msg, c_0, r, K_tilde, K):
    m = 1  # added for our case
    n = len(K)  # added for our case
    for j in range(m):
        if ord_G * K_tilde[j] != EC.O:
            raise Exception("ord_G * K_tilde[j] != EC.O")

    W = [
        sum([H_n([f"CLSAG_{j}"] + K + K_tilde) * K[i][j] for j in range(m)], start=EC.O)
        for i in range(n)
    ]

    W_tilde = sum(
        [H_n([f"CLSAG_{j}"] + K + K_tilde) * K_tilde[j] for j in range(m)], start=EC.O
    )

    c_prim = [None] * n
    c_prim[0] = c_0

    for i in range(n):
        c_prim[(i + 1) % n] = H_n(
            f"CLSAG_c",
            K,
            msg,
            r[i] * G + c_prim[i] * W[i],
            r[i] * H_p(K[i][0]) + c_prim[i] * W_tilde,
        )
    return c_0 == c_prim[0]


# msg = "message"
# sig = sign(msg, [signerPriv], G, publicPool, pi=2)
# is_valid = verify(msg, *sig)
# print("Accepted?", is_valid)
