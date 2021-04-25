import './Joke.css'

export const Joke = (props) => {
    return (
        <div className="joke">
            <div className="line" id="setup">{props.setup}</div>
            <div className="line" id="delivery">{props.delivery}</div>
        </div>
    )
}