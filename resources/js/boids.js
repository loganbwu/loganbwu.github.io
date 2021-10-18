const v = 5;
const damping = 0.1;

const max_dist_sep = 20;
const max_dist_coh = 200;
const wall_range = 100;

const strength_sep = 10;
const strength_coh = 3;
const strength_ali = 0.2;

const strength_wall = 0.001;
const strength_noise = 0.01;
const strength_mouse = 3;

// Create SVG boids
var svg = document.getElementById("svg-content");
var basic_boid = document.querySelector(".boid");
for (let i = 1; i < 25; i++) {
    clone = basic_boid.cloneNode(true);
    svg.appendChild(clone);
}

var boids = document.querySelectorAll(".boid");
var container = document.getElementById("container")
var mousepos = [0, 0];

// Initialise position and velocity for SVG elements
var pos = [];
var vel = [];
for (const boid of boids) {
    pos.push([100 * Math.random() + 500, 100 * Math.random()]);
    vel.push([strength_noise * (Math.random() - 0.5), strength_noise * (Math.random() - 0.5)]);
}

document.addEventListener('mousemove', function(evt) {
    mousepos = [evt.clientX, evt.clientY];
},
false);

var acc, acc_sep, acc_coh, vel_ali, acc_ali, acc_wall, acc_mouse;
function norm(x) {
    return Math.sqrt(x[0]**2 + x[1]**2);
}
function normalise(x) {
    let x_norm = norm(x);
    return x_norm > 0 ? [x[0] / x_norm, x[1] / x_norm] : [0, 0];
}

function animate() {
    for (let i = 0; i < boids.length; i++) {
        // Calculate acceleration
         acc_sep = [0, 0];
         acc_coh = [0, 0];
         vel_ali = [0, 0];
        for (let j = 0; j < boids.length; j++) {
            if (j === i) { continue; }
            let dist_sep = [pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]];
            let dist_sep_norm = normalise(dist_sep);
            let abs_dist_sep = norm(dist_sep);
            // Separation
            if (abs_dist_sep < max_dist_sep) {
                acc_sep[0] = dist_sep_norm[0] * ((max_dist_sep - abs_dist_sep)/max_dist_sep)**2;
                acc_sep[1] = dist_sep_norm[1] * ((max_dist_sep - abs_dist_sep)/max_dist_sep)**2;
            }
            if (abs_dist_sep < max_dist_coh) {
                // Cohesion
                acc_coh[0] -= dist_sep_norm[0];
                acc_coh[1] -= dist_sep_norm[1];
                // Alignment
                vel_ali[0] += vel[j][0];
                vel_ali[1] += vel[j][1];
            }
        }
        
        // Avoid walls
         acc_wall = [0, 0];
        if (pos[i][0] < wall_range) {
            acc_wall[0] = (wall_range-pos[i][0]) ** 2;
        } else if (pos[i][0] > (container.offsetWidth - wall_range)) {
            acc_wall[0] = -((pos[i][0] + wall_range - container.offsetWidth) ** 2);
        }
        if (pos[i][1] < wall_range) {
            acc_wall[1] = (wall_range-pos[i][1]) ** 2;
        } else if (pos[i][1] > (container.offsetHeight - wall_range)) {
            acc_wall[1] = -((pos[i][1] + wall_range - container.offsetHeight) ** 2);
        }
        
        // Go to mouse
        acc_mouse = [mousepos[0] - pos[i][0], mousepos[1] - pos[i][1]];
        acc_mouse = normalise(acc_mouse);
        
        // Normalise vectors
        acc_sep = normalise(acc_sep);
        acc_coh = normalise(acc_coh);
        
        // Calculate neighborhood mean velocity
        vel_ali = [vel_ali[0] / (boids.length-1), vel_ali[1] / (boids.length-1)];
        // Calculate difference between neighborhood mean and boid's self velocity;
        let acc_ali = [vel_ali[0] - vel[i][0], vel_ali[1] - vel[i][1]];
        acc_ali = normalise(acc_ali);
        
        // Calculate raw acceleration before drag
        acc = [0, 0];
        for (let j = 0; j < 2; j++) {
            acc[j] += strength_noise * (Math.random()-0.5);
            acc[j] += strength_sep * acc_sep[j];
            acc[j] += strength_coh * acc_coh[j];
            acc[j] += strength_ali * acc_ali[j];
            acc[j] += strength_wall * acc_wall[j];
            if (mousepos[0] > 0 && mousepos[1] > 0) {
                acc[j] += strength_mouse * acc_mouse[j];
            }
        }
        
        // Integrate acceleration for velocity and apply drag
        vel[i][0] += damping * acc[0];
        vel[i][1] += damping * acc[1];
        // Normalise velocity
        vel[i] = normalise(vel[i]);
        vel[i][0] = v * vel[i][0];
        vel[i][1] = v * vel[i][1];
        // Integrate velocity for position, wrapping container
        pos[i][0] = Math.max(Math.min(pos[i][0] + vel[i][0], container.offsetWidth), 0);
        pos[i][1] = Math.max(Math.min(pos[i][1] + vel[i][1], container.offsetHeight), 0);
        // Calculate velocity angle
        let theta = -Math.atan2(vel[i][0], vel[i][1]) * 180 / Math.PI;
        // Update SVG element
        boids[i].setAttribute("transform", "translate(" + pos[i][0] + " " + pos[i][1] + ") rotate(" + theta + ")");
    }
}

function main() {
    if (window.innerWidth > 920) {
        animate();
    }
    requestAnimationFrame(main);
}

main();