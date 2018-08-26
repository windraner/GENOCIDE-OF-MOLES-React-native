export const Wrapper = {
	margin: '15px auto',
	width: 850
}

export const H1 = {
	textAlign: 'center',
	textTransform: 'uppercase',
	font: 'bold 75px/90px Arial'
}

export const H2 = {
	fontSize: 20,
	lineHeight: 22,
	fontFamily: 'Arial',
	fontWeight: 'bold',
	alignSelf: 'center',
	paddingBottom: 10
}

export const P = {
	fontSize: 18,
	lineHeight: 20,
	fontFamily: 'Arial',
	fontWeight: 'bold',
	alignSelf: 'center'
}

export const Separator = {
	clear: 'both'
}

export const HoleWrapper = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 2,
    justifyContent: 'space-around',
    alignContent: 'space-around',
	borderWidth: 2,
	borderRadius: 10,
	backgroundColor: '#F6CEE3',
	marginLeft: 10,
	marginRight: 10
}

export const StatusWrapper = {
	borderWidth: 2,
	borderRadius: 10,
	backgroundColor: '#F6CEE3',
	display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'center',
    margin: 10
}

export const StartWrapper = {
	flex: 1,
	justifyContent: 'center',
	alignContent: 'center',
}

export const StartText = {
	fontSize: 35,
	fontFamily: 'Arial',
	fontWeight: 'bold',
	alignSelf: 'center'
}

export const EndWrapper = {
	flex: 1,
	justifyContent: 'center',
	alignContent: 'space-around',
}

export const EndText = {
	fontSize: 45,
	fontFamily: 'Arial',
	fontWeight: 'bold',
	alignSelf: 'center'
}

export const EndImage = {
	width: 185,
	display: 'block',
	margin: '0 auto'
}

const HoleContainer = {
	width: 100,
	height: 100,
	backgroundColor: '#E6E6E6'
}

export const Hole = {
	...HoleContainer
	//backgroundImage: 'url("2.png")'
}

export const HoleClick = {
	...Hole,
	backgroundColor: '#FE2E2E'
}

export const HoleActive = {
	...HoleContainer
}

export const HoleActiveClick = {
	...HoleActive,
	backgroundColor: '#58FA58'
}


export const LvlUP = {
	border: 'solid 10px #07A407',
    margin: 10,
    borderRadius: 5,
    height: 170,
    font: 'bold 40px/150px arial',
    textAlign: 'center',
    boxSizing: 'border-box',
    color: '#07A407',
    backgroundColor: '#84F284'
}