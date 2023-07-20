import { useSelector } from 'react-redux';
import './Loading.styles.scss';

function Loading() {
    const showLoading = useSelector(state => state.ChangeState.isLoading)

    return (
        // <div className="loading-container">
        <div hidden={!showLoading} className="m-2">
            <div className="loading">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden"></span>
                </div>
            </div>
        </div>
    );
}
export default Loading;