export default function Scoreboard({gameInfo}) {
    return(
        <div>
            <h1>Score: {gameInfo.score}</h1>
            <h1>Max Score: {gameInfo.maxScore}</h1>
            <h1>Level: {gameInfo.level}</h1>
            <h1>Max Level: {gameInfo.maxLevel}</h1>
        </div>

    );
}