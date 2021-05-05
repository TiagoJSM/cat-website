import Button from 'react-bootstrap/Button';

import './Voter.css';

type Props = { 
    voteCount: number,
    upvote: Function,
    downvote: Function 
};

function Voter(props: Props) {
    const { voteCount, upvote, downvote } = props;
    return (
        <div className="voter">
            <Button onClick={(e: any) => upvote()}>Upvote</Button>
            <div className="vote-count">{voteCount}</div>
            <Button onClick={(e: any) => downvote()}>Downvote</Button>
        </div>
    );
}

export default Voter;
