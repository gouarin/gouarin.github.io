---
order: 50
org: CAFES
position: Responsable projet
dates: Depuis 2015
url: https://github.com/gouarin/cafes
---

Le logiciel CAFES (CArtesian Finite Element Solvers) est écrit en C/C++ et est parallélisé à l’aide de MPI. Il s’appuie fortement sur la librairie PETSc pour la gestion des matrices éléments finis et l’utilisation de solveurs. Le but est de pouvoir résoudre un ensemble de problèmes où il est nécessaire d’avoir un solveur sur grille cartésienne, comme les interactions fluide - particules rigides, l’influence des cils sur les écoulements (par exemple les cils bronchiques) ou le déplacement de micro-nageurs dans un fluide visqueux. Dans chacun des cas, un problème sous contraintes est écrit en résolvant plusieurs problèmes de Stokes où l’on a ajouté un second membre prenant en compte les particules, les cils, ... Ce logiciel est utilisé dans le cadre de l’ANR RheoSuNN.
