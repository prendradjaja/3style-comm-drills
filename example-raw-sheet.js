const rawSheet = `
Exclude	Pair	Commutator
	HA.	[U: [R D' R', U2]]
	HB.	[R D' R', U']
	HD.	[U2: [R D' R', U]]
	HE.	[R D': [U, R D R']]
	HF.	[L2, U' R' U]
	HG.	[L2: [U' R' U, L]]
	HI.	[R U' D: [R' D R, U2]]
	HK.	[U R U': [R D' R', U']]
	HL.	[D2: [R U R' , D']]
	HN.	[U R: [R D' R', U2]]
	HO.	[R D': [R' U' R, D2]]
	HP.	[D2, R U R']
	HQ.	[U' L U, R]
	HR.	[U2 R2: [D', R' U R]]
	HT.	[D2: [R U R', D]]
	HU.	[D' R D U' : [R' U R , D2]]
	HV.	[D: [R2, U L' U']]
	HW.	[D L D', R2]
		
	BA.	[R' B' R: [U', R D R']]
	BD.	[l D: [R' D' R, U]]
	BE.	[R: [U, R D R']]
	BF.	[R': [R' D' R, U']]
	BG.	[R' D R, U]
	BI.	[R: [U2, R D R']]
	BK.	[D': [R' D R, U]]
	BL.	[D: [R' D' R, U]]
	BO.	[U' , R D R']
	BP.	[R' D' R, U]
	BR.	[R': [R' D' R, U2]]
	BS.	[D' : [U' , R D R']]
	BT.	[D: [U', R D' R']]
	BU.	[R F': [R' U' R , D]]
	BV.	[U' R' D R: [R D' R', U]]
	BW.	[U R D' R': [U', R' D R]]
	BX.	[l' D: [R' D' R, U]]
		
	SA.	[U D': [R D R', U2]]
	SD.	[D: [U', R' D R]]
	SE.	[UD R': [R' D R, U']]
	SF.	[F, l U2 l']
	SG.	[U D2: [R U' R', D']]
	SI.	[D' R D' U': [R' D R, U2]]
	SK.	[U' D': [R' U' R, D2]]
	SL.	[D' R D: [R' U' R, D2]]
	SN.	[U' R' U: [R D' R', U2]]
	SO.	[U': [D', R' U' R]]
	SP.	[F', l U2 l']
	SQ.	[R' U: [R U' R', D2]]
	SR.	[F': [L' D' L, U]]
	ST.	[R' D: [R' U' R, D2]]
	SU.	[l U' D': [R D R', U2]]
	SV.	[U' D' R2: [D, R U R']]
	SW.	[U R: [D2, R U' R']]
		
	XA.	[R' U' D' R: [D, R U' R']]
	XD.	[R' D' R: [D, R U' R']]
	XE.	[R: [U, R D' R']]
	XF.	
	XG.	
	XI.	[R: [U2, R D' R']]
	XK.	
	XL.	
	XN.	
	XO.	
	XP.	[R: [U', R D' R']]
	XQ.	
	XR.	
	XT.	
x	XU.	example of excluding a comm
	XV.	
	XW.	
`

module.exports = rawSheet;
