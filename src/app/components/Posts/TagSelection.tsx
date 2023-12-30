import { useState, useEffect } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import { api } from '~/trpc/react';

export default function TagSelection() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState([""]);
  const [value, setValue] = useState([""]);

  const tagList = api.tag.getAll.useQuery().data

  useEffect(() => {
    if (tagList) {
      const sortedTagListNames = tagList.sort((a, b) => b.popularity - a.popularity).map(tag => "#" + tag.name)
      setData(sortedTagListNames);
    }
  }, [tagList]);
  

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    if (value.length >= 5) { setSearch(""); return };

    const tag = val.startsWith("#") ? val : "#" + val;
    setSearch('');

    if (val === '$create') {
      const newTag = search.startsWith("#") ? search : "#" + search;
      setData((current) => [...current, newTag]);
      setValue((current) => [...current, newTag]);
    } else {
      setValue((current) =>
        current.includes(tag) ? current.filter((v) => v !== tag) : [...current, tag]
      );
    }
  };

  const handleValueRemove = (val: string | undefined) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Enter up to 5 tags..."
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    const lastElement = value[value.length - 1];
                    if (lastElement !== undefined) {
                    handleValueRemove(value[value.length - 1]);
                    }
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search.startsWith("#") ? "" : "#"}{search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}