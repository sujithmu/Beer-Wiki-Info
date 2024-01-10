import ErrorImg from './error-msg.jpg';

interface ErrorPageProps {
    message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
    return (
        <div>
            <p>{message}</p>
            <img src={ErrorImg} alt="BeerIamge" style={{width: 200, height: 200}} />
        </div>
    );
};

export default ErrorPage;