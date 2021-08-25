import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "./style.scss";

const { Search } = Input;

const SearchInput = ({
  suffix,
  placeholder,
  onSearch,
  btnText,
  loading,
  input,
  onChange,
}) => {
  return (
    <div className="search-section">
      <Search
        placeholder={placeholder}
        enterButton={btnText}
        size="large"
        suffix={suffix}
        onSearch={onSearch}
        className="search-input"
        loading={loading}
        // defaultValue={input}
        onChange={onChange}
        value={input}
      />
    </div>
  );
};

export default SearchInput;
