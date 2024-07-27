"use client";

import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { countryList } from "../../data/countries";
import { Box, Popover } from "@mui/material";
import Image from "next/image";

interface CountryDropdownProps {
  open: boolean;
  anchor: null | HTMLElement;
  countrySelect: (e: BaseSyntheticEvent, country: string) => void;
  onClose: () => void;
}
const CountryDropdown = ({ open, anchor, countrySelect, onClose }: CountryDropdownProps) => {
  const [isOpen, setOpen] = useState(open);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const filteredCountries = countryList.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (e: BaseSyntheticEvent, option: string) => {
    countrySelect(e, option);
    onClose();
  };

  useEffect(() => {
    if (anchor !== null) {
      setAnchorEl(anchor);
    }
  }, [anchor]);

  useEffect(() => {
    setOpen(open);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      {anchorEl !== null && (
        <Popover
          id={"countryDropdown"}
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              borderRadius: "12px",
            },
          }}
        >
          <Box
            component={"div"}
            sx={{
              padding: "1.5rem 1rem 0",
              borderRadius: "12px",
              width: {
                md: "250px",
              },
              height: {
                md: "auto",
              },
              maxHeight: "300px",
              ".dropdown": {
                width: "100%",
                height: "100%",
                overflowY: "hidden",
                overflowX: "hidden",
                ".search": {
                  position: "relative",
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid #cecece",
                  background: "white",
                  height: "30px",
                  padding: "0 10px",
                  color: "gray",
                  fontSize: "16px",
                },
                ".list": {
                  width: "100%",
                  height: "100%",
                  padding: "0px",
                  ".item": {
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                    mb: "10px",
                    ".txt": {
                      fontSize: "19px",
                      color: "#474747",
                    },
                    ".img": {
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #cecece",
                      objectFit: "cover",
                      padding: "1px",
                    },
                  },
                },
              },
            }}
          >
            <div className="dropdown">
              <input
                type="text"
                placeholder="Search for a country"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search"
                name="searchCountry"
                autoFocus
                ref={inputRef}
              />
              <ul className="list">
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    className="item"
                    onClick={(e) => {
                      handleSelect(e, country.name);
                    }}
                  >
                    <span className="txt"> {country.name}</span>

                    <Image
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                      alt=""
                      sizes={"100vw"}
                      width={40}
                      height={40}
                      className="img"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Popover>
      )}
    </>
  );
};

export default CountryDropdown;
