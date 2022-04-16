import { JournalText } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const navigate = useNavigate()
    return (
        <div style={{ 'position': 'relative' }}>
            <h1 className="intro">Write out a thought with Notell!</h1>
            <ul>
                <li className="list">Make Personal Notes</li>
                <li className="list">Check out notes from others and find like minds</li>
                <li className="list">A Feature Feed to let others see your notes!</li>
            </ul>
            <p style={{ 'color': '#faece2', 'margin': '30px' }}><a className="link-b" href="/login">Login</a> or <a className="link-b" href="/sign-up">Register</a> to get started.</p>
            <JournalText className="journal" width="50%" height="50%" color="#9e834b" />
        </div >
    )
}

