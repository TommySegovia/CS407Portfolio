import styles from './Home.css';
function Home(){
    return(
        <div id="mainPage">
            <h1>Welcome to my CS 407 Portfolio</h1>
            <div id="summaryDiv">
                <p>
                    This is my portfolio for CS 407. It contains all the assignments I have completed for the computer graphics class so far. <br/>
                    My Name is <strong>Tommy Segovia</strong> and I am a Computer Science student at Western Oregon University.<br/>
                    Check out all of the work <a href="https://github.com/TommySegovia/CS407Portfolio">here</a> on my GitHub.
                </p>
            </div>
        </div>
    )
}

export default Home;