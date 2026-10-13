#!/usr/bin/python3
"""Regression tests for scholar-stats.py parsing.

Run: python3 test_scholar_stats.py
"""

import os
import sys
import importlib.util

BASEDIR = os.path.dirname(os.path.realpath(__file__))

spec = importlib.util.spec_from_file_location(
    "scholar_stats", os.path.join(BASEDIR, "scholar-stats.py"))
scholar_stats = importlib.util.module_from_spec(spec)
spec.loader.exec_module(scholar_stats)


def test_parses_good_profile():
    with open(os.path.join(BASEDIR, "scholar.html"), encoding="utf-8") as f:
        html = f.read()
    res = scholar_stats.parse_citations(html)
    assert res["citations"] > 0, res
    assert len(res["years"]) == len(res["num"]) > 0, res
    print("PASS test_parses_good_profile ->", res["citations"], "citations")


def test_blocked_page_raises_clear_error():
    with open(os.path.join(BASEDIR, "BAK/blocked-sorry-page.html"), encoding="utf-8") as f:
        html = f.read()
    try:
        scholar_stats.parse_citations(html)
    except scholar_stats.ScholarBlocked as e:
        assert "unusual traffic" in str(e).lower() or "blocked" in str(e).lower(), str(e)
        print("PASS test_blocked_page_raises_clear_error ->", e)
        return
    raise AssertionError("expected ScholarBlocked, got no exception")


if __name__ == "__main__":
    failures = 0
    for name, fn in sorted(globals().items()):
        if name.startswith("test_"):
            try:
                fn()
            except Exception as e:
                failures += 1
                print(f"FAIL {name} -> {type(e).__name__}: {e}")
    sys.exit(1 if failures else 0)
