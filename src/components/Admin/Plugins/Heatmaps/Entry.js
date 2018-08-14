import {Popover, Icon, Tag} from 'antd';

const heatmapEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span>  <Icon type={'line-chart'}/> {mention.name} </span>
    </div>
  );
};

export default heatmapEntry;
