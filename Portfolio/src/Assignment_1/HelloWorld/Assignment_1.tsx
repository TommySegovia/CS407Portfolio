import Animation from './Animation';
import styles from './Assignment_1.module.css';

function Assignment_1(){
	return(
		<div id={styles.mainPage}>
			<h1 className={styles.h1}>Assignment 1</h1>
			<Animation />
		</div>
	)
}

export default Assignment_1;