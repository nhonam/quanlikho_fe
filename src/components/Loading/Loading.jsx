import './Loading.styles.scss';

const Loading = ({ hidden }) => (
    <div hidden={hidden} className="loading-container">
        <div className="loading">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    </div>
);

export default Loading;