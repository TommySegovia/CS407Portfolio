import Animation from './Animation';
import styles from './Assignment_1.module.css';

function Assignment_1(){
	return(
		<div id={styles.mainPage}>
			<h1 className={styles.h1}>Assignment 1</h1>
			<Animation />
			<div id="summaryDiv" className={styles.summaryDiv}>
			<p>
			The goal of this assignment is to create a simple 'Hello World' demo using Three.js
			</p>
		</div>
		</div>
	)
}

export default Assignment_1;