export const Iterator = (props) => {
    //you could validate proptypes also...
    if(!props.array.length) return null
    return props.array.map(element => props.component(element))
}