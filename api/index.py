import sys
import os

# Ensure api directory is in sys.path for serverless imports
sys.path.append(os.path.dirname(__file__))

from main import app

# Entrypoint for Vercel @vercel/python serverless runtime
__all__ = ["app"]
