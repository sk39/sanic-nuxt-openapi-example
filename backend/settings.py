import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


def _str2bool(s):
    return s.lower() in ["true", "t", "yes", "1"]


DB_DSN = os.environ.get("DB_DSN")
DB_DSN_TEST = os.environ.get("DB_DSN_TEST")
DB_ECHO = _str2bool(os.environ.get("DB_ECHO"))

DEBUG = _str2bool(os.environ.get("DEBUG"))
