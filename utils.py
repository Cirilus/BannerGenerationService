import sys
from contextlib import contextmanager


@contextmanager
def recursion_limit(limit):
    original_limit = sys.getrecursionlimit()
    sys.setrecursionlimit(limit)
    try:
        yield
    finally:
        sys.setrecursionlimit(original_limit)
