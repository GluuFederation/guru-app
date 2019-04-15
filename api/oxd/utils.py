import random


def generate_nonce(length=8):
    """Generate pseudorandom number."""

    return ''.join([str(random.randint(0, 9)) for i in range(length)])
