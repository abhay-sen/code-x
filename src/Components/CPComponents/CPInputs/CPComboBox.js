import React, { useState, useMemo, useCallback } from "react";
import { Label, Col } from "reactstrap";
import Select from "react-select";

const CP_comboBox = ({ labelTitle, choicesFromApi, id, value, onBlur, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const options = useMemo(
    () =>
      choicesFromApi.map((choice) => ({
        primaryKeyValue: choice.primaryKey, // Internal tracking of the primaryKey
        value: choice.mainColumn, // Using mainColumn as the value to be returned
        label: choice.mainColumn,
        masterFilter: choice.masterFilter,
        code: choice.code,
      })),
    [choicesFromApi]
  );

  const filterOption = useCallback(
    ({ label, data }, input) => {
      const lowercasedInput = input.toLowerCase();
      return (
        label.toLowerCase().includes(lowercasedInput) ||
        data.masterFilter.toLowerCase().includes(lowercasedInput)
      );
    },
    []
  );

  const handleChange = useCallback(
    (selectedOption) => {
      onChange(selectedOption ? selectedOption.value : null); // Send mainColumn value
      setIsSelected(!!selectedOption);
    },
    [onChange]
  );

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 999, // Ensure dropdown appears on top of error message
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      borderColor: error ? '#F06548' : provided.borderColor, // Highlight border if there's an error
    }),
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group">
        <Col xs={"auto"}>
          <Label className="cpinput-group-text" htmlFor={id}>{labelTitle}</Label>
        </Col>
        <Col md={6} style={{ flex: 1 }}>
          <Select
            styles={customStyles}
            options={options}
            value={options.find((option) => option.value === value) || null}
            onFocus={() => {
              setIsFocused(true);
              setIsSelected(false);
            }}
            onBlur={onBlur}
            onChange={handleChange}
            filterOption={filterOption}
          />
        </Col>
      </div>
      {error && (
        <div
          style={{
            color: "#F06548",
            marginTop: "4px", // Add margin to prevent overlap
            fontSize: "0.775rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default CP_comboBox;
