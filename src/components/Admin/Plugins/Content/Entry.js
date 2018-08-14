import {Popover, Icon, Tag} from 'antd';

const contentEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span>

         {mention.type === 'youtube' && <Icon type={'youtube'}/> }

        {mention.type === 'pdf' && <Icon type={'file-pdf'}/> }

        {mention.type === 'facebook' && <Icon type={'facebook'}/> }

        {mention.title}

        </span>
    </div>
  );
};

export default contentEntry;
