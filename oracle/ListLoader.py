#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys

import concurrent
from typing import Any, Dict, List, Optional, Sequence, Type, Union
import logging
from pathlib import Path
from langchain_core.documents import Document
from langchain_community.document_loaders.base import BaseLoader
from langchain_community.document_loaders.text import TextLoader
# from langchain_community.document_loaders.unstructured import UnstructuredFileLoader
# from langchain_community.document_loaders.helpers import detect_file_encodings

# FILE_LOADER_TYPE = Union[
#     Type[UnstructuredFileLoader], Type[TextLoader]
# ]

logger = logging.getLogger(__name__)


def _is_visible(p: Path) -> bool:
    parts = p.parts
    for _p in parts:
        if _p.startswith("."):
            return False
    return True


class ListLoader(BaseLoader):
    """Load documents from a list of filepaths (batch)
    """

    def __init__(
        self,
        input_list: list,
        # metadata: Sequence[str] = (),
        silent_errors: bool = False,
        show_progress: bool = False,
        loader_cls: Type[TextLoader] = TextLoader,
        loader_kwargs: Union[dict, None] = None,
        exclude: Union[Sequence[str], str] = (),
        use_multithreading: bool = False,
        max_concurrency: int = 2,
        load_hidden: bool = False,
        encoding: Optional[str] = None,
        autodetect_encoding: bool = False,
    ):
        if loader_kwargs is None:
            loader_kwargs = {}
        if isinstance(exclude, str):
            exclude = (exclude,)
        self.input_list = input_list
        self.exclude = exclude
        self.silent_errors = silent_errors
        self.loader_cls = loader_cls
        self.loader_kwargs = loader_kwargs
        self.show_progress = show_progress
        self.use_multithreading = use_multithreading
        self.max_concurrency = max_concurrency
        self.load_hidden = load_hidden
        self.encoding = encoding
        self.autodetect_encoding = autodetect_encoding

    def load(self) -> List[Document]:
        """Load data from list into document objects."""
        docs: List[Document] = []

        items: List[str] = []
        for file_path in self.input_list:
            p = Path(file_path)
            if not p.exists():
                raise FileNotFoundError(f"Path not found: '{file_path}'")
            # if not p.is_file():
            #     raise ValueError(f"Expected file, got directory: '{file_path}'")
            items.append(p)

        pbar = None
        if self.show_progress:
            try:
                from tqdm import tqdm
                pbar = tqdm(total=len(items))
            except ImportError as e:
                logger.warning(
                    "To log the progress of DirectoryLoader you need to install tqdm, "
                    "`pip install tqdm`"
                )

        if self.use_multithreading:
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=self.max_concurrency
            ) as executor:
                executor.map(lambda i: self.load_file(i, i.parent, docs, pbar), items)
        else:
            for i in items:
                p = i.parent
                self.load_file(i, p, docs, pbar)

        if pbar:
            pbar.close()
        
        return docs


    def load_file(
        self, item: Path, path: Path, docs: List[Document], pbar: Optional[Any]
    ) -> None:
        """Load a file.

        Args:
            item: File path.
            path: Directory path.
            docs: List of documents to append to.
            pbar: Progress bar. Defaults to None.

        """
        if item.is_file():
            if _is_visible(item.relative_to(path)) or self.load_hidden:
                try:
                    logger.debug(f"Processing file: {str(item)}")
                    sub_docs = self.loader_cls(str(item), **self.loader_kwargs).load()
                    docs.extend(sub_docs)
                except Exception as e:
                    if self.silent_errors:
                        logger.warning(f"Error loading file {str(item)}: {e}")
                    else:
                        logger.error(f"Error loading file {str(item)}")
                        raise e
                finally:
                    if pbar:
                        pbar.update(1)

