---
order: 50
org: CAFES
position: Project lead
dates: Since 2015
url: https://github.com/gouarin/cafes
---

CAFES (CArtesian Finite Element Solvers) is written in C/C++ and parallelised with MPI. It relies heavily on PETSc for finite element matrices and solvers. Its goal is to solve problems that need a solver on a Cartesian grid, such as fluid - rigid particle interactions, the influence of cilia on flows (for example bronchial cilia) or micro-swimmers moving in a viscous fluid. In each case, a constrained problem is written by solving several Stokes problems with a right-hand side that accounts for the particles, the cilia, ... The software is used in the ANR project RheoSuNN.
