# República 29 - Web Experience

![República 29](./src/img/replogo.png)

A comprehensive web experience showcasing **República 29**, one of the most vibrant student housing communities at USP São Carlos, created for the **CodeLab** extension group at the University of São Paulo.

## Project Objective

This project aims to promote and digitally represent **República 29** by providing:
- An informative website with details about the community, location, residents, and FAQ
- An interactive pixel-art game that immerses visitors in a virtual representation of the house
- A modern, responsive platform accessible from any device
- A dynamic showcase of student life at one of USP's most active student communities

**Visit the live project:** [https://hassanpls.github.io/Rep29/](https://hassanpls.github.io/Rep29/)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Game Mechanics](#game-mechanics)
- [Contributors](#contributors)
- [License](#license)
- [Citation](#citation)

## Features

### Website
- **Responsive Design** - Optimized for desktop and mobile devices
- **Interactive Sections** - Apresentação (introduction), Localização (location), Fotos da Casa (house photos), Moradores (residents), FAQ
- **Google Maps Integration** - Embedded map showing the exact location of República 29
- **Image Carousel** - Showcase of house photos with smooth navigation
- **Member Cards** - Dynamic profile cards for current residents
- **Modern UI/UX** - Clean and engaging design with smooth animations

### Interactive Game - "Aventura na 29"
- **Browser-based 2D Game** - Built with Phaser 4.2.1
- **Pixel-art Aesthetic** - Custom sprite graphics and tileset
- **Multi-level Gameplay** - Explore two floors (Andar1 and Andar2) of the house
- **Dynamic Mechanics**:
  - Player movement with WASD or arrow keys
  - Stamina system with running mechanic
  - Enemy AI with vision cone detection
  - Collectible items (eggs/ovos) scattered throughout the house
  - Collision detection with house objects and walls
- **Responsive Canvas** - Automatically scales to window size
- **Audio Effects** - Sound feedback for collectibles and game events
- **Score System** - Tracks collected items throughout gameplay

## Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with flexbox, grid, and animations
- **JavaScript ES6+** - Modern JavaScript with modules and async patterns

### Game Engine
- **Phaser 4.2.1** - Open-source, WebGL-based 2D game framework
  - Physics engine (Arcade physics)
  - Animation system
  - Input handling
  - Scene management

### Asset Creation & Design
- **Aseprite** - Pixel-art sprite and animation creation
- **Tiled Map Editor** - Tileset and collision map design (JSON format)

### Hosting & Deployment
- **GitHub Pages** - Free hosting and automatic deployment from repository
- **Git** - Version control

### Development Practices
- **ES6 Modules** - Organized code with import/export statements
- **Responsive Web Design** - Mobile-first approach
- **Vanilla JavaScript** - No additional UI frameworks (clean and performant)

## Project Structure

```
Rep29/
├── index.html                    # Main website homepage
├── game/
│   ├── index.html               # Game entry point
│   ├── src/
│   │   ├── config.js            # Phaser game configuration
│   │   ├── main.js              # Game initialization and registry
│   │   ├── scenes/
│   │   │   ├── Andar1.js        # First floor game scene
│   │   │   ├── Andar2.js        # Second floor game scene
│   │   │   └── CenaAndar.js     # Base scene class with shared logic
│   │   └── utils/
│   │       └── OvoManager.js    # Collectible spawning and management
│   └── assets/
│       ├── Casa/                # House tileset data
│       │   ├── mapa_casa.json
│       │   ├── mapa_casa2.json
│       │   └── tileset_casa.ase
│       └── Marola/              # Player character assets
│           ├── Marola-0001.anim
│           └── Marola-0001.ase
├── src/
│   ├── css/                     # Stylesheets
│   │   ├── header.css
│   │   ├── inicio.css
│   │   ├── apresentacao.css
│   │   ├── localizacao.css
│   │   ├── lar.css
│   │   ├── moradores.css
│   │   ├── FAQ.css
│   │   ├── footer.css
│   │   ├── projeto.css
│   │   └── game.css
│   ├── js/                      # Utility scripts
│   │   ├── cardMembers.js       # Dynamic member profile rendering
│   │   ├── carroselLar.js       # Image carousel functionality
│   │   ├── localBenefits.js     # Interactive benefits section
│   │   ├── members.json         # Member data
│   │   └── navBar.js            # Navigation menu handling
│   └── img/                     # Images and graphics
└── README.md                    # This file
```

## Usage

### Accessing the Website

Visit [https://hassanpls.github.io/Rep29/](https://hassanpls.github.io/Rep29/) and navigate through the sections:
- **Início** (Home) - Welcome and introduction
- **Apresentação** (About) - Detailed information about República 29
- **Localização** (Location) - Interactive map and location benefits
- **Fotos da Casa** (Photos) - Image carousel of the house
- **Moradores** (Residents) - Current member profiles
- **FAQ** - Frequently asked questions

### Playing "Aventura na 29"

Launch the game by clicking the "Jogar Agora" (Play Now) button on the website.

**Controls:**
- Arrow Keys or WASD - Move the character (Marola)
- Shift (hold) - Sprint/run (consumes stamina)
- Mouse - Look around (automatic camera follow)

**Objectives:**
- Collect as many eggs (ovos) as possible
- Avoid enemy characters (guards) with red vision cones
- Explore both floors of the house
- Manage your stamina for strategic sprinting

**Stamina System:**
- Green bar (>30%) - Optimal stamina
- Yellow bar (<30%) - Low stamina
- Regenerates when walking, depletes when running

**Game Over:**
- Detected by an enemy - Returns to starting position, resets score
- Try again to beat your high score

## Game Mechanics

### Scene Management
- **Andar1** (First Floor) - Main area with multiple rooms and collectibles
- **Andar2** (Second Floor) - Additional exploration area
- Seamless transitions between floors

### Physics & Collision
- Arcade physics engine for realistic movement
- Static collision groups for walls and furniture
- Overlap detection for collectibles and enemies

### AI Enemies
- **Patrol Points** - Enemies follow predefined patrol routes
- **Vision Cone** - 100px range with 50° vision angle
- **Automatic Detection** - Triggers game over if player enters vision cone
- **Velocity-based Movement** - Smooth enemy animation

### Asset Pipeline
- Sprites created in **Aseprite** (.ase files)
- Maps designed in **Tiled** (exported as JSON)
- Tileset integration with collision data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

The MIT License requires that any derivative works or reuse of this project must include a copy of the license and attribution to the original authors (Aquiles and PM, developed for CodeLab at USP São Carlos).

## Citation

If you use or reference this project, please cite it as follows:

```
@misc{republica29,
  title={República 29 - Web Experience},
  author={Aquiles and PM},
  year={2024},
  howpublished={\url{https://hassanpls.github.io/Rep29/}},
  note={Developed for CodeLab, USP São Carlos}
}
```
