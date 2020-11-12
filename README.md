A tool for generating "drill sequences" for practicing [3style](https://www.speedsolving.com/wiki/index.php/Beyer-Hardwick_Method) comms.

Inspired by [Bertie Longden's "drills"](https://www.youtube.com/watch?v=ciH9l6GNk4w).

## Usage and options

```
git clone https://github.com/prendradjaja/3style-comm-drills
cd 3style-comm-drills

npm install

# Create raw-sheet.js.
# You can fill this in with your own comms as long as the format matches.
# The columns "Pair" and "Commutator" are required. Extra columns are allowed and ignored.
cp example-raw-sheet.js raw-sheet.js

node main.js
```

Can be customized changing the `const selectedOptions = ...` line in `main.js`.

Various options are available. All are required except when they're ignored.

- **set:** A | B | … | all
    - Which set to drill, or `all` to drill everything
- **direction:** forward-only | inverse-only | mixed
    - **Ignored if** set is `all`
    - Whether to drill e.g. AB AC AD or to allow BA CA DA. "Forward" is defined by which set you're drilling: If you're drilling A, then AB is forward, and if you're drilling B, then BA is forward.
- **order:** random | alphabetical
    - Whether to drill random comms or go through all of them in order.
- **duplicates:** duplicates-allowed | inverses-allowed | no-inverses
    - **Ignored if** order is alphabetical
    - When using random order, whether a comm can come up multiple times.
    - `duplicates-allowed:` AB AB AB BA BA BA is allowed.
    - `inverses-allowed:` AB BA is allowed, but AB AB is not.
    - `no-inverses:` AB BA is not allowed. 💃❌
- **n:** (positive integer)
    - **Ignored if** order is alphabetical.
    - The total number of cases (comms) to generate.
    - May generate fewer if duplicates are not allowed.
- **chunkSize:** (positive integer)
    - The size of each "chunk". (See example output below: chunkSize = 4)
    - Last chunk may be smaller than the rest (if n is not divisible by chunkSize)

## Example output

With the given `example-raw-sheet.js` and main.js untouched (`selectedOptions = oneFullSetForwardChunked('B')`), you'll get this output.

[alg.cubing.net](https://alg.cubing.net/?alg=%2F%2F_R_U_B2_R-_B2_R2_U-_R_F2_L2_F2_D_B2_L2_U_B2_U_R2_U_F2_U%0A%2F%2F_BA_BD_BE_BF%0A%0A%2F%2F_R_U-_R-_L2_U-_R_U2_R_L2_D2_L2_B2_D2_R2_F2_U_F2_L2_U_F2_U2%0A%2F%2F_BG_BH_BI_BK%0A%0A%2F%2F_R_D_R_F2_U-_L_D_L_U_D-_F2_U_R2_D_R2_U-_R2_F2_D-_B2_D_F2%0A%2F%2F_BL_BO_BP_BR%0A%0A%2F%2F_R_F2_R2_D2_R-_F2_D2_R-_D_B2_R2_U-_L2_U_R2_F2_B2_U-_R2_U_R2_D2%0A%2F%2F_BS_BT_BU_BV%0A%0A%2F%2F_U_F2_L2_U_D_B2_L2_U2_F2_R2_D%0A%2F%2F_BW_BX%0A%0AR_U_B2_R-_B2_R2_U-_R_F2_L2_F2_D_B2_L2_U_B2_U_R2_U_F2_U%0A%5BR-_B-_R:_%5BU-,_R_D_R-%5D%5D_%2F%2F_BA%0A%5Bl_D:_%5BR-_D-_R,_U%5D%5D_%2F%2F_BD%0A%5BR:_%5BU,_R_D_R-%5D%5D_%2F%2F_BE%0A%5BR-:_%5BR-_D-_R,_U-%5D%5D_%2F%2F_BF%0A%0AR_U-_R-_L2_U-_R_U2_R_L2_D2_L2_B2_D2_R2_F2_U_F2_L2_U_F2_U2%0A%5BR-_D_R,_U%5D_%2F%2F_BG%0A%5BU-,_R_D-_R-%5D_%2F%2F_BH%0A%5BR:_%5BU2,_R_D_R-%5D%5D_%2F%2F_BI%0A%5BD-:_%5BR-_D_R,_U%5D%5D_%2F%2F_BK%0A%0AR_D_R_F2_U-_L_D_L_U_D-_F2_U_R2_D_R2_U-_R2_F2_D-_B2_D_F2%0A%5BD:_%5BR-_D-_R,_U%5D%5D_%2F%2F_BL%0A%5BU-,_R_D_R-%5D_%2F%2F_BO%0A%5BR-_D-_R,_U%5D_%2F%2F_BP%0A%5BR-:_%5BR-_D-_R,_U2%5D%5D_%2F%2F_BR%0A%0AR_F2_R2_D2_R-_F2_D2_R-_D_B2_R2_U-_L2_U_R2_F2_B2_U-_R2_U_R2_D2%0A%5BD-:_%5BU-,_R_D_R-%5D%5D_%2F%2F_BS%0A%5BD:_%5BU-,_R_D-_R-%5D%5D_%2F%2F_BT%0A%5BR_F-:_%5BR-_U-_R,_D%5D%5D_%2F%2F_BU%0A%5BU-_R-_D_R:_%5BR_D-_R-,_U%5D%5D_%2F%2F_BV%0A%0AU_F2_L2_U_D_B2_L2_U2_F2_R2_D%0A%5BU_R_D-_R-:_%5BU-,_R-_D_R%5D%5D_%2F%2F_BW%0A%5Bl-_D:_%5BR-_D-_R,_U%5D%5D_%2F%2F_BX%0A)

```
// R U B2 R' B2 R2 U' R F2 L2 F2 D B2 L2 U B2 U R2 U F2 U
// BA BD BE BF

// R U' R' L2 U' R U2 R L2 D2 L2 B2 D2 R2 F2 U F2 L2 U F2 U2
// BG BH BI BK

// R D R F2 U' L D L U D' F2 U R2 D R2 U' R2 F2 D' B2 D F2
// BL BO BP BR

// R F2 R2 D2 R' F2 D2 R' D B2 R2 U' L2 U R2 F2 B2 U' R2 U R2 D2
// BS BT BU BV

// U F2 L2 U D B2 L2 U2 F2 R2 D
// BW BX

R U B2 R' B2 R2 U' R F2 L2 F2 D B2 L2 U B2 U R2 U F2 U
[R' B' R: [U', R D R']] // BA
[l D: [R' D' R, U]] // BD
[R: [U, R D R']] // BE
[R': [R' D' R, U']] // BF

R U' R' L2 U' R U2 R L2 D2 L2 B2 D2 R2 F2 U F2 L2 U F2 U2
[R' D R, U] // BG
[U', R D' R'] // BH
[R: [U2, R D R']] // BI
[D': [R' D R, U]] // BK

R D R F2 U' L D L U D' F2 U R2 D R2 U' R2 F2 D' B2 D F2
[D: [R' D' R, U]] // BL
[U', R D R'] // BO
[R' D' R, U] // BP
[R': [R' D' R, U2]] // BR

R F2 R2 D2 R' F2 D2 R' D B2 R2 U' L2 U R2 F2 B2 U' R2 U R2 D2
[D': [U', R D R']] // BS
[D: [U', R D' R']] // BT
[R F': [R' U' R, D]] // BU
[U' R' D R: [R D' R', U]] // BV

U F2 L2 U D B2 L2 U2 F2 R2 D
[U R D' R': [U', R' D R]] // BW
[l' D: [R' D' R, U]] // BX
```
