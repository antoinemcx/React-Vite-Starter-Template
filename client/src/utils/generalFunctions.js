export const setTitle = (newTitle) => {
    return (document.title = newTitle ? `${process.env.REACT_APP_NAME} - ${newTitle}` : process.env.REACT_APP_NAME);
}