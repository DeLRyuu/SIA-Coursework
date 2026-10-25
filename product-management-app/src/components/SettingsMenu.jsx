import { useState, useRef, useEffect } from "react";

function SettingsMenu({ theme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const gearBtnRef = useRef(null);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  // Close menu and return focus to gear button
  const closeMenu = () => {
    setIsOpen(false);
    if (gearBtnRef.current) {
      gearBtnRef.current.focus();
    }
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        gearBtnRef.current &&
        !gearBtnRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % itemRefs.current.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (index - 1 + itemRefs.current.length) % itemRefs.current.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  // Focus the first item when menu opens
  useEffect(() => {
    if (isOpen && itemRefs.current[0]) {
      setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 50);
    }
  }, [isOpen]);

  const selectTheme = (newTheme) => {
    onThemeChange(newTheme);
    closeMenu();
  };

  const handleLogout = () => {
    // Visible item: does nothing except close menu
    closeMenu();
  };

  return (
    <div className="settings-menu-container">
      <button
        ref={gearBtnRef}
        type="button"
        className={`settings-gear-btn ${isOpen ? "active" : ""}`}
        aria-label="Settings"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="settings-dropdown"
          role="menu"
          aria-label="Settings options"
        >
          <div className="menu-group-label">Theme</div>
          <button
            ref={(el) => (itemRefs.current[0] = el)}
            type="button"
            role="menuitem"
            className={`menu-item ${theme === "light" ? "active-theme" : ""}`}
            onClick={() => selectTheme("light")}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          >
            <span>Light</span>
            {theme === "light" && (
              <svg
                className="check-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </button>

          <button
            ref={(el) => (itemRefs.current[1] = el)}
            type="button"
            role="menuitem"
            className={`menu-item ${theme === "dark" ? "active-theme" : ""}`}
            onClick={() => selectTheme("dark")}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          >
            <span>Dark</span>
            {theme === "dark" && (
              <svg
                className="check-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </button>

          <hr className="menu-divider" />

          <button
            ref={(el) => (itemRefs.current[2] = el)}
            type="button"
            role="menuitem"
            className="menu-item menu-item-logout"
            onClick={handleLogout}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          >
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsMenu;
