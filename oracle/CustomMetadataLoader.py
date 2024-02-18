#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os
import textract
from langchain_community.document_loaders.base import BaseLoader
from typing import List, Optional
from langchain_core.documents import Document
from langchain_community.document_loaders.helpers import detect_file_encodings


class CustomLoader(BaseLoader):
  def __init__(
      self,
      file_path: str,
      encoding: Optional[str] = None,
      autodetect_encoding: bool = False,
  ):
        """Initialize with file path."""
        self.file_path = file_path
        self.encoding = encoding
        self.autodetect_encoding = autodetect_encoding

  def load(self) -> List[Document]:
    """Load from pdf"""
    try:
      with open() as f:
        text = f.read(self.file_path)
    except Exception as e:
      raise RuntimeError(f"Error loading {self.file_path}") from e

    # priority = 0 if name.startswith('-') else 1
    # if priority > 0:
    #   priority = len(name) - len(name.lstrip('!'))
    #   if priority > 3: priority = 3

    filehash = self.file_path.split('/')[-1].replace('.txt', '')

    metadata = {"hash": filehash, "source": self.file_path}
    return [Document(page_content=text, metadata=metadata)]
