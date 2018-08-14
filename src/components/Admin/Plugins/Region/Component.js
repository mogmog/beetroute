import {Icon} from 'antd';

const regionComponent = (flyTo, addBorder) => (mentionProps) => {

  return (
    <span
      className={mentionProps.className}
      onClick={() => {
        flyTo(mentionProps.mention.geojson);
      }}
    >

         <Icon type={'global'}/> {mentionProps.mention.name}

        </span>
  )
}

export default regionComponent;
