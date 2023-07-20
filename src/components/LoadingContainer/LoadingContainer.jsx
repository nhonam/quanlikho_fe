import './LoadingContainer.styles.scss';

const LoadingContainer = ({ children, hidden, isShow }) => (
    <div hidden={hidden} className="loading-container-wapper">
        <div hidden={!isShow} className="loading-container-spinner">
            <div className="spinner-border text-info" role="status"></div>
        </div>
        <div className={isShow ? "loading-container-child" : ""}>
            {children}
        </div>
    </div>
);

export default LoadingContainer;