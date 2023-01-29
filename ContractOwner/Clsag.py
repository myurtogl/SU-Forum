from Ed25519Curve import EC, H_n, H_p, Point

# SET PARAMS
b, G, ord_G = EC.b, EC.G, EC.ord_G


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


def fromStringToPoint(string):
    x = int(string[2 : string.index(",")])
    y = int(string[string.index(",") + 2 : -2])
    return Point(x, y, EC)
