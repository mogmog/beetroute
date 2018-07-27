import {Popover} from 'antd';

const definitionComponent = (mentionProps) => {

  const content = (
    <div>
      <i>{mentionProps.mention.value} </i>
    </div>
  );

  return (
    <span className={mentionProps.className}>
          <Popover content={content} title={mentionProps.mention.name} overlayStyle={{width: '400px'}}>
            {mentionProps.mention.name}
          </Popover>
    </span>
  )
}

export default definitionComponent;
