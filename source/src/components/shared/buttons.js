const PrimaryButton = (props) => {

    const { text, icon } = props;

    return (
        <button type="submit" className="group relative w-full flex space-x-4 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" {...props}>
            {icon &&
                <span><i className={icon} /></span>
            }
            <span className="hidden sm:inline">{text}</span>
        </button>
    )
}

export { PrimaryButton };