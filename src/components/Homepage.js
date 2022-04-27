import { JournalText } from 'react-bootstrap-icons';

export const Homepage = () => {
    return (
        <div className="homepage">
            <h1 className="intro">NOTELL!</h1>
            <JournalText className='journal' />
            <ul>
                <li className="list">Collect your thoughts!</li>
                <li className="list">A Feature Feed to let others see your notes!</li>
            </ul>
            <p style={{ 'color': '#faece2', 'margin': '30px' }}><a className="link-b" href="/login">LOGIN</a> or <a className="link-b" href="/sign-up">REGISTER</a> to get started.</p>
        </div >
    )
}

