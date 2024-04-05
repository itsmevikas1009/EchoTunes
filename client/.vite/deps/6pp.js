import {
  require_react
} from "./chunk-FQO5W7GE.js";
import {
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/6pp/dist/index.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var cache = /* @__PURE__ */ new Map();
var useFetchData = (url, key, dependencyProps = []) => {
  const [data, setData] = (0, import_react.useState)();
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)("");
  const [refetchIndex, setRefetchIndex] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const controller = new AbortController();
    if (cache.has(key)) {
      setData(JSON.parse(cache.get(key)));
      return;
    }
    setLoading(true);
    fetch(url, { credentials: "include", signal: controller.signal }).then(async (res) => {
      const data2 = await res.json();
      if (!res.ok) {
        throw new Error(data2.message || "Errro while fetching!");
      } else {
        setData(data2);
        cache.set(key, JSON.stringify(data2));
      }
    }).catch((error2) => {
      if (error2.name !== "AbortError") {
        setError(error2.message || "Something went wrong!");
      }
    }).finally(() => setLoading(false));
    return () => {
      controller.abort();
    };
  }, [refetchIndex, ...dependencyProps]);
  const refetch = () => {
    cache.delete(key);
    setRefetchIndex((prevIndex) => prevIndex + 1);
  };
  const clearCache = () => {
    cache.delete(key);
  };
  return { data, loading, error, refetch, clearCache };
};
var errorMessages = {
  length: "at least 8 characters",
  number: "a number",
  specialChar: "a special",
  capitalLetter: "a capital",
  lowercaseLetter: "a lowercase"
};
var isIncludeNumber = (password) => {
  const regex = /\d/;
  return regex.test(password);
};
var isIncludeSpecialChar = (password) => {
  const specialCharRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialCharRegex.test(password);
};
var isIncludeCapitalLetter = (password) => {
  const capitalLetterRegex = /[A-Z]/;
  return capitalLetterRegex.test(password);
};
var isIncludeLowercaseLetter = (password) => {
  const lowercaseLetterRegex = /[a-z]/;
  return lowercaseLetterRegex.test(password);
};
var isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};
var isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
};
var isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
var isValidPhoneNumber = (phoneNumber) => {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
};
var isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};
var isValidTime = (time) => {
  const regex = /^\d{2}:\d{2}$/;
  return regex.test(time);
};
var isValidDateTime = (dateTime) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  return regex.test(dateTime);
};
var isDateBetween = (date, startDate, endDate) => {
  const targetDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= targetDate && targetDate <= end;
};
var useFileHandler = (type, limitInMb = 5, maxFiles = 10) => {
  const initialFile = type === "multiple" ? [] : null;
  const initialPreview = type === "multiple" ? [] : null;
  const [error, setError] = (0, import_react.useState)(null);
  const [file, setFile] = (0, import_react.useState)(initialFile);
  const [preview, setPreview] = (0, import_react.useState)(initialPreview);
  const changeHandler = (e) => {
    if (!e.target.files)
      return;
    if (type === "single") {
      const singleFile = e.target.files[0];
      if (e.target.files.length > 1) {
        return setError("Cannot upload more than 1 file, please select type as 'Multiple'");
      }
      if (singleFile.size > 1024 * 1024 * limitInMb) {
        return setError("File size too large");
      }
      const reader = new FileReader();
      reader.readAsDataURL(singleFile);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      setFile(singleFile);
    }
    if (type === "multiple") {
      const files = Array.from(e.target.files);
      if (maxFiles && files.length > maxFiles) {
        return setError(`Maximum ${maxFiles} files allowed`);
      }
      for (const item of files) {
        if (item.size > 1024 * 1024 * limitInMb) {
          setError("File size too large");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onloadend = () => {
          setPreview((prev) => {
            if (Array.isArray(prev)) {
              return [...prev, reader.result];
            } else
              return [reader.result];
          });
        };
        setFile((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, item];
          } else
            return [item];
        });
      }
    }
  };
  return {
    file,
    preview,
    error,
    changeHandler
  };
};
var useStrongPassword = () => {
  const [error, setError] = (0, import_react.useState)("");
  const [value, setValue] = (0, import_react.useState)("");
  const changeHandler = (e) => {
    const val = e.target.value;
    setValue(val);
    const errors = [];
    if (val.length < 8)
      errors.push(errorMessages.length);
    if (!isIncludeNumber(val))
      errors.push(errorMessages.number);
    if (!isIncludeSpecialChar(val))
      errors.push(errorMessages.specialChar);
    if (!isIncludeCapitalLetter(val))
      errors.push(errorMessages.capitalLetter);
    if (!isIncludeLowercaseLetter(val))
      errors.push(errorMessages.lowercaseLetter);
    setError(errors.length > 0 ? `Password must include ${errors.join(", ")} character` : "");
  };
  return {
    error,
    value,
    changeHandler
  };
};
var useInputValidation = (initialVal, validator = () => void 0) => {
  const [value, setValue] = (0, import_react.useState)(initialVal);
  const [error, setError] = (0, import_react.useState)("");
  const changeHandler = (e) => {
    let newValue;
    if (typeof value === "number") {
      newValue = Number(e.target.value);
    } else {
      newValue = e.target.value;
    }
    setValue(newValue);
    const validationResult = validator(newValue);
    if (validationResult) {
      setError(validationResult.errorMessage);
    } else {
      setError("");
    }
  };
  return {
    value,
    changeHandler,
    error
  };
};
var useConfirmModal = ({ title = "Confirm Delete", subtitle = "Are you sure you want to delete?", confirmHandler }) => {
  const modalRef = (0, import_react.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const showModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeHandler = (e) => {
    var _a;
    if (!modalRef.current)
      return;
    const dialogDimension = (_a = modalRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (e.clientX < dialogDimension.left || e.clientX > dialogDimension.right || e.clientY < dialogDimension.top || e.clientY > dialogDimension.bottom)
      closeModal();
  };
  const handler = () => {
    closeModal();
    confirmHandler();
  };
  const ConfirmModal = ({ containerStyles = {}, noBtnStyles = {}, yesBtnStyles = {}, subtitleStyles = {}, titleStyles = {}, containerClassName }) => React.createElement(
    "section",
    { onKeyDown: (e) => e.preventDefault(), onClick: closeHandler, style: {
      display: isOpen ? "block" : "none",
      height: "100vh",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0
    } },
    React.createElement("article", { style: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(2px)"
    } }),
    React.createElement(
      "div",
      { className: `_6pp-confirm-modal ${containerClassName}`, style: {
        width: "20rem",
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "0.25rem",
        border: "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        zIndex: 20,
        transform: "translate(-50%,-50%)",
        ...containerStyles
      }, ref: modalRef },
      React.createElement("h5", { style: {
        fontFamily: "sans-serif",
        textTransform: "uppercase",
        ...titleStyles
      } }, title),
      React.createElement("p", { style: { fontFamily: "monospace", margin: "1rem", ...subtitleStyles } }, subtitle),
      React.createElement(
        "div",
        { style: {
          display: "flex",
          gap: "1rem",
          marginTop: "1rem 0",
          float: "right"
        } },
        React.createElement("button", { style: {
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: "inherit",
          color: "rgba(0,0,0,0.9)",
          transition: "all 0.3s",
          ...noBtnStyles
        }, autoFocus: true, onClick: closeModal }, "No"),
        React.createElement("button", { style: {
          border: "none",
          outline: "none",
          cursor: "pointer",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          backgroundColor: "rgba(0,0,0,0.9)",
          color: "white",
          transition: "all 0.3s",
          ...yesBtnStyles
        }, onClick: handler }, "Yes")
      )
    )
  );
  return { ConfirmModal, showModal, close };
};
var useRating = ({ IconFilled, IconOutline, maxRating = 5, value = 0, selectable = false, styles = {} }) => {
  if (maxRating < 1)
    throw new Error("maxRating should be greater than 0");
  if (value > maxRating)
    throw new Error("value should be less than Max Rating");
  const [rating, setRating] = (0, import_react.useState)(value);
  const handleClick = (newRating) => {
    if (!selectable)
      return;
    setRating(newRating);
  };
  (0, import_react.useEffect)(() => {
    setRating(value);
  }, [value]);
  const Ratings = () => React.createElement("div", { style: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...styles
  } }, Array.from({ length: maxRating }).map((_, i) => React.createElement(
    "span",
    { style: {
      cursor: selectable ? "pointer" : "unset"
    }, key: i, onClick: () => handleClick(i + 1) },
    i < rating && React.createElement("span", null, IconFilled),
    i >= rating && React.createElement("span", null, IconOutline)
  )));
  return { Ratings, rating, setRating };
};
var useInfiniteScrollBottom = (urlWithEndpoint, pageQueryKeyword, limitQueryKeyword, limit, listClassName, totalPages = 1) => {
  const [data, setData] = (0, import_react.useState)([]);
  const [page, setPage] = (0, import_react.useState)(1);
  const [hasMore, setHasMore] = (0, import_react.useState)(true);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)();
  const timeoutId = (0, import_react.useRef)(null);
  const fetchData = (0, import_react.useCallback)(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${urlWithEndpoint}?${pageQueryKeyword}=${page}&${limitQueryKeyword}=${limit}`, { credentials: "include" });
      if (!response.ok)
        throw new Error("Something went wrong");
      const newData = await response.json();
      setData((oldData) => [...oldData, ...newData]);
      setHasMore(newData.length > 0);
    } catch (error2) {
      setError(error2 || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit, urlWithEndpoint, pageQueryKeyword, limitQueryKeyword]);
  (0, import_react.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  (0, import_react.useEffect)(() => {
    const loadMore = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        if (totalPages === page)
          return;
        setPage((oldPage) => oldPage + 1);
      }, 200);
    };
    const observerDown = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    }, {
      rootMargin: "100px"
    });
    const lastListItem = document.querySelector(`.${listClassName}:last-of-type`);
    if (lastListItem) {
      observerDown.observe(lastListItem);
    }
    return () => {
      observerDown.disconnect();
      if (timeoutId.current)
        clearTimeout(timeoutId.current);
    };
  }, [totalPages, page, hasMore, loading]);
  return {
    loading,
    hasMore,
    page,
    error,
    data,
    setData
  };
};
var useInfiniteScrollTop = (containerRef, totalPages, page, setPage, newData, shouldReverse = false) => {
  const [data, setData] = (0, import_react.useState)([]);
  const debounceTimer = (0, import_react.useRef)(null);
  const handleScroll = (0, import_react.useCallback)(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      if (!containerRef.current)
        return;
      const { scrollTop } = containerRef.current;
      const scrolledToTop = scrollTop === 0;
      if (scrolledToTop) {
        if (totalPages === page)
          return;
        setPage((oldPage) => oldPage + 1);
      }
    }, 200);
  }, [totalPages, page]);
  (0, import_react.useEffect)(() => {
    const container = containerRef.current;
    if (container)
      container.addEventListener("scroll", handleScroll);
    return () => {
      if (container)
        container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, data]);
  (0, import_react.useEffect)(() => {
    let prevScrollHeight = 0;
    let prevScrollTop = 0;
    if (containerRef.current) {
      prevScrollHeight = containerRef.current.scrollHeight;
      prevScrollTop = containerRef.current.scrollTop;
    }
    if (newData) {
      setData((oldData) => {
        const seen = new Set(oldData.map((i) => i._id));
        const newMessages = newData == null ? void 0 : newData.filter((i) => !seen.has(i._id));
        if (shouldReverse) {
          const newDataArray = Array.isArray(newMessages) ? [...newMessages] : [newMessages];
          return [...newDataArray.reverse(), ...oldData];
        } else {
          return [...newMessages, ...oldData];
        }
      });
    }
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const newScrollTop = prevScrollTop + containerRef.current.scrollHeight - prevScrollHeight;
        containerRef.current.scrollTop = newScrollTop;
      }
    });
  }, [newData]);
  return { data, setData };
};
var Pagination = ({ totalPages = 1, currPage, setCurrPage, activeButtonStyle = {
  backgroundColor: "black",
  color: "white"
}, Button = ({ children, onClick, style }) => React.createElement("button", { style: {
  padding: "0.5rem 1rem",
  outline: "none",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  backgroundColor: "#e2e8f0",
  ...style
}, onClick }, children), Container = ({ children }) => React.createElement("ul", { style: {
  display: "flex",
  gap: "1rem",
  listStyle: "none"
} }, children) }) => {
  const [startPage, setStartPage] = (0, import_react.useState)(1);
  const maxPageButtons = 4;
  const changePage = (page) => {
    setCurrPage(page);
    if (page > startPage + maxPageButtons - 1) {
      setStartPage(page);
    } else if (page < startPage) {
      setStartPage(page - maxPageButtons + 1);
    }
  };
  return React.createElement(
    Container,
    null,
    React.createElement(
      React.Fragment,
      null,
      startPage > 1 && React.createElement(
        "li",
        null,
        React.createElement(Button, { onClick: () => setStartPage((prev) => prev - maxPageButtons) }, "Prev")
      ),
      Array.from({ length: Math.min(maxPageButtons, totalPages) }, (_, idx) => startPage + idx).map((page) => {
        return React.createElement(
          "li",
          { key: page },
          React.createElement(Button, { style: currPage === page ? activeButtonStyle : {}, onClick: () => changePage(page) }, page)
        );
      }),
      totalPages > startPage + maxPageButtons - 1 && React.createElement(
        "li",
        null,
        React.createElement(Button, { onClick: () => setStartPage((prev) => prev + maxPageButtons) }, "Next")
      )
    )
  );
};
var PageStepper = ({ totalPages = 1, currPage, setCurrPage, Typography = ({ children }) => React.createElement("code", null, children), Button, Container = ({ children }) => React.createElement("nav", { style: {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem 0"
} }, children) }) => {
  const isPreviousDisabled = currPage === 1;
  const isNextDisabled = currPage === totalPages;
  const handlePreviousClick = () => {
    if (currPage === 1)
      return;
    setCurrPage((prev) => prev - 1);
  };
  const handleNextClick = () => {
    if (currPage === totalPages)
      return;
    setCurrPage((prev) => prev + 1);
  };
  return React.createElement(
    Container,
    null,
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Button, { disabled: isPreviousDisabled, onClick: handlePreviousClick }, "Previous"),
      React.createElement(
        Typography,
        null,
        currPage,
        " of ",
        totalPages
      ),
      React.createElement(Button, { disabled: isNextDisabled, onClick: handleNextClick }, "Next")
    )
  );
};
var MyntraCarousel = ({ images, darkMode = false, objectFit = "cover", setIsOpen, PrevButton, NextButton }) => {
  const [activeImage, setActiveImage] = (0, import_react.useState)(0);
  const containerRef = (0, import_react.useRef)(null);
  const imageRef = (0, import_react.useRef)(null);
  const border = darkMode ? "1px solid #fff" : "1px solid black";
  const incrementHandler = () => {
    if (activeImage === images.length - 1)
      setActiveImage(0);
    else
      setActiveImage((prev) => prev + 1);
  };
  const decrementHandler = () => {
    if (activeImage === 0)
      setActiveImage(images.length - 1);
    else
      setActiveImage((prev) => prev - 1);
  };
  const mouseMoveHandler = (0, import_react.useCallback)((e) => {
    var _a;
    const y = e.clientY;
    (_a = containerRef.current) == null ? void 0 : _a.scrollTo({ top: y });
  }, []);
  const closeHandler = (e) => {
    if (!containerRef.current)
      return;
    const containerDimension = containerRef.current.getBoundingClientRect();
    if (e.clientX < containerDimension.left || e.clientX > containerDimension.right || e.clientY < containerDimension.top || e.clientY > containerDimension.bottom)
      setIsOpen(false);
  };
  (0, import_react.useEffect)(() => {
    if (containerRef.current)
      containerRef.current.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);
  const ImagesList = React.createElement("aside", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "absolute",
    top: "1rem",
    left: "1rem"
  } }, images.map((i, idx) => React.createElement(
    "button",
    { key: idx, style: {
      border: idx === activeImage ? border : "1px solid rgba(0,0,0,0.3)",
      outline: "none",
      backgroundColor: "transparent",
      width: "fit-content",
      height: "unset",
      cursor: "pointer"
    }, onClick: () => setActiveImage(idx) },
    React.createElement("img", { style: {
      width: "2rem",
      height: "2.5rem",
      objectFit: "contain"
    }, src: i, alt: "Image" })
  )));
  const NavigationButton = React.createElement(
    "article",
    { style: {
      display: "flex",
      width: "95%",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    } },
    React.createElement(PrevButton, { onClick: decrementHandler }),
    React.createElement(NextButton, { onClick: incrementHandler })
  );
  return React.createElement(
    "section",
    { style: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.7)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 200
    }, onClick: closeHandler },
    React.createElement(
      "div",
      { style: {
        width: "100%",
        maxWidth: "950px",
        height: "100vh",
        position: "relative",
        margin: "auto",
        boxShadow: darkMode ? "0 0 5px black" : "0 0 5px white",
        overflow: "auto",
        cursor: "s-resize",
        scrollbarWidth: "none",
        backgroundColor: darkMode ? "black" : "#fff"
      }, ref: containerRef },
      React.createElement("img", { ref: imageRef, src: images[activeImage], style: {
        width: "100%",
        minHeight: "100vh",
        objectFit
      } }),
      React.createElement(
        "div",
        { style: {
          position: "fixed",
          top: 0,
          width: "95%",
          maxWidth: "950px",
          height: "100vh"
        } },
        ImagesList,
        NavigationButton
      )
    )
  );
};
var StylishCarousel = ({ imageSize = ["100%", "80vw", "25rem", "30rem"], images = [], objectFit = "cover", imageBg = "transparent", sideImageSize = ["3rem", "3.5rem", "4rem", "5rem"] }) => {
  if (images.length === 0)
    throw new Error("imageSize should not be more than 4");
  if (imageSize.length > 5)
    throw new Error("imageSize should not be more than 4");
  const [activeImage, setActiveImage] = (0, import_react.useState)(0);
  const [currentWidth, setCurrentWidth] = (0, import_react.useState)("");
  const [sideImageWidth, setSideImageWidth] = (0, import_react.useState)("");
  const resizeHandler = (0, import_react.useCallback)(() => {
    const width = window.screen.width;
    if (width < 480) {
      setCurrentWidth(imageSize[0]);
      setSideImageWidth(sideImageSize[0]);
    } else if (width < 768 && imageSize.length >= 3) {
      setCurrentWidth(imageSize[1]);
      setSideImageWidth(sideImageSize[1]);
    } else if (width < 992 && imageSize.length >= 4) {
      setCurrentWidth(imageSize[2]);
      setSideImageWidth(sideImageSize[2]);
    } else if (width < 1280 && imageSize.length >= 5) {
      setCurrentWidth(imageSize[3]);
      setSideImageWidth(sideImageSize[3]);
    } else {
      setCurrentWidth(imageSize[imageSize.length - 1]);
      setSideImageWidth(sideImageSize[sideImageSize.length - 1]);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return React.createElement(
    "div",
    { style: {
      width: "fit-content",
      display: "flex",
      gap: "1rem",
      padding: "1rem"
    } },
    React.createElement("aside", { style: {
      display: "flex",
      flexDirection: "column",
      width: "fit-content",
      gap: "1rem"
    } }, images.map((i, index) => React.createElement("img", { key: index, style: {
      width: sideImageWidth,
      height: sideImageWidth,
      borderRadius: "0.25rem",
      objectFit,
      border: "1px solid  rgba(0,0,0,0.3)"
    }, src: i, alt: `Image-${index}`, onMouseOver: () => setActiveImage(index) }))),
    React.createElement("section", { style: {
      width: currentWidth,
      height: currentWidth,
      overflow: "hidden",
      scrollbarWidth: "none",
      display: "flex",
      alignItems: "center",
      borderRadius: "0.5rem",
      backgroundColor: imageBg
    } }, images.map((i, index) => React.createElement("img", { key: index, style: {
      width: currentWidth,
      height: currentWidth,
      objectFit: "contain",
      aspectRatio: "1/1",
      borderRadius: "0.5rem",
      transition: "all 0.3s",
      transform: `translateX(-${activeImage * 100}%)`
    }, src: i, alt: `Photo-${index}` })))
  );
};
var Slider = ({ images, objectFit = "cover", PrevIcon, NextIcon, bgColor = "inherit", showNav = true, showDots, showThumbnails, autoplay, autoplayDuration = 4e3, onClick }) => {
  const [activeImage, setActiveImage] = (0, import_react.useState)(0);
  const incrementHandler = () => {
    setActiveImage((prev) => {
      if (prev === images.length - 1)
        return 0;
      return prev + 1;
    });
  };
  const decrementHandler = () => {
    setActiveImage((prev) => {
      if (prev === 0)
        return images.length - 1;
      return prev - 1;
    });
  };
  (0, import_react.useEffect)(() => {
    let intervalId;
    if (autoplay) {
      intervalId = setInterval(() => {
        incrementHandler();
      }, autoplayDuration);
    }
    return () => {
      if (intervalId)
        clearInterval(intervalId);
    };
  }, []);
  const NavigationButton = React.createElement(
    "article",
    { style: {
      padding: "1rem",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      top: "50%",
      transform: "translateY(-50%)"
    } },
    React.createElement("button", { style: {
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      outline: "none"
    }, onClick: decrementHandler }, PrevIcon || "Prev"),
    React.createElement("button", { style: {
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      outline: "none"
    }, onClick: incrementHandler }, NextIcon || "Next")
  );
  const Dots = React.createElement("article", { style: {
    padding: "1rem",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    bottom: 0,
    gap: "0.5rem"
  } }, images.map((_, idx) => React.createElement("button", { key: idx, style: {
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    border: "none",
    backgroundColor: idx === activeImage ? "white" : "black"
  }, onClick: () => setActiveImage(idx) })));
  const Thumbnails = React.createElement("aside", { style: {
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap"
  } }, images.map((i, index) => React.createElement("img", { key: index, style: {
    width: "5rem",
    height: "5rem",
    borderRadius: "0.25rem",
    objectFit: "cover",
    border: "1px solid  rgba(0,0,0,0.3)"
  }, src: i, alt: `Image-${index}`, onMouseOver: () => setActiveImage(index) })));
  return React.createElement(
    "div",
    { style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      backgroundColor: bgColor
    } },
    React.createElement(
      "div",
      { style: {
        height: "100%",
        display: "flex",
        overflowX: "hidden",
        position: "relative"
      } },
      images.map((i, index) => React.createElement("img", { key: index, style: {
        width: "100%",
        height: "100%",
        objectFit,
        flex: "none",
        transition: "all 0.3s",
        transform: `translateX(-${activeImage * 100}%)`
      }, src: i, onClick: () => onClick && onClick() })),
      showNav && NavigationButton,
      showDots && Dots
    ),
    showThumbnails && Thumbnails
  );
};
var FireBolt = (0, import_react.memo)(({ size = 10, color = "black", styles, zoom = "2", mode = "normal" }) => {
  if (size < 1 || size > 40) {
    throw new Error("Size must be between 1 and 40");
  }
  const circles = (0, import_react.useRef)();
  const coordinates = (0, import_react.useRef)({ x: 0, y: 0 });
  const fireBoltZoomRef = (0, import_react.useRef)(false);
  const handleMouseMove = (e) => {
    coordinates.current = {
      x: e.clientX,
      y: e.clientY
    };
    const target = e.target;
    const fireboltZoom = target.getAttribute("data-firebolt-zoom");
    fireBoltZoomRef.current = Boolean(fireboltZoom);
  };
  const animateCircles = (0, import_react.useCallback)(() => {
    let x = coordinates.current.x;
    let y = coordinates.current.y;
    const cursors = circles.current;
    if (!cursors) {
      return;
    }
    Array.from(cursors).forEach((circle, idx) => {
      circle.style.left = `${x - 12}px`;
      circle.style.top = `${y - 12}px`;
      circle.x = x;
      circle.y = y;
      const newSize = (cursors.length - idx) / cursors.length;
      circle.style.scale = newSize.toString();
      const nextCircle = cursors[idx + 1] || cursors[0];
      x += (Number(nextCircle.x || 0) - x) * 0.3;
      y += (Number(nextCircle.y || 0) - y) * 0.3;
      if (idx === 0 && fireBoltZoomRef.current) {
        circle.style.scale = zoom;
      }
    });
    requestAnimationFrame(animateCircles);
  }, []);
  (0, import_react.useEffect)(() => {
    circles.current = document.getElementsByClassName("6pp-firebolt-Cursor");
    animateCircles();
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return React.createElement("div", { style: {
    zIndex: "10000",
    mixBlendMode: mode,
    pointerEvents: "none"
  } }, Array.from({ length: size }).map((_, i) => React.createElement("div", { className: "6pp-firebolt-Cursor", key: i, style: {
    position: "fixed",
    height: "24px",
    width: "24px",
    borderRadius: "50%",
    left: 0,
    top: 0,
    backgroundColor: color,
    userSelect: "none",
    pointerEvents: "none",
    transition: "scale 0.2s",
    ...styles
  } })));
});
export {
  FireBolt,
  MyntraCarousel,
  PageStepper,
  Pagination,
  Slider,
  StylishCarousel,
  isDateBetween,
  isIncludeCapitalLetter,
  isIncludeLowercaseLetter,
  isIncludeNumber,
  isIncludeSpecialChar,
  isValidDate,
  isValidDateTime,
  isValidEmail,
  isValidPhoneNumber,
  isValidTime,
  isValidUrl,
  isValidUsername,
  useConfirmModal,
  useFetchData,
  useFileHandler,
  useInfiniteScrollBottom,
  useInfiniteScrollTop,
  useInputValidation,
  useRating,
  useStrongPassword
};
//# sourceMappingURL=6pp.js.map
