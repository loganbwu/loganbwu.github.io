const v = 5;
const damping = 0.75;

const max_dist_sep = 10;
const max_dist_coh = 100;
const wall_range = 50;

const strength_sep = 100;
const strength_coh = 10;
const strength_ali = 0.01;

const strength_wall = 100;
const strength_noise = 0.1;
const strength_drag = 0.01;
const strength_mouse = 10;

// Create SVG boids
var svg = document.getElementById("svg-content");
var basic_boid = document.querySelector(".boid");
for (let i = 1; i < 50; i++) {
    clone = basic_boid.cloneNode(true);
    svg.appendChild(clone);
}

var boids = document.querySelectorAll(".boid");
var container = document.getElementById("container")
var mousepos = [0, 0];

// Initialise position, velocity and acceleration for SVG elements
var pos = [];
var vel = [];
for (const boid of boids) {
    pos.push([100 * Math.random() + 500, 100 * Math.random()]);
    vel.push([strength_noise * (Math.random() - 0.5), strength_noise * (Math.random() - 0.5)]);
}
// Initialise velocities

document.addEventListener('mousemove', function(evt) {
    mousepos = [evt.clientX, evt.clientY];
},
false);

function animate() {
    for (let i = 0; i < boids.length; i++) {
        let boid = boids[i];
        // Calculate acceleration
        // Separation, cohesion
        let acc_sep = [0, 0];
        let acc_coh = [0, 0];
        let vel_ali = [0, 0];
        for (let j = 0; j < boids.length; j++) {
            if (j === i) { continue; }
            let dist_sep = [pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]];
            let abs_dist_sep = Math.sqrt(dist_sep[0] ** 2 + dist_sep[1] ** 2);
            // Separation
            if (abs_dist_sep < max_dist_sep) {
                acc_sep[0] +=  1 / (dist_sep[0] + 1);
                acc_sep[1] += 1 / (dist_sep[1] + 1);
            }
            if (abs_dist_sep < max_dist_coh) {
                // Cohesion
                acc_coh[0] -= dist_sep[0]
                acc_coh[1] -= dist_sep[1]
                // Alignment
                vel_ali[0] += vel[j][0];
                vel_ali[1] += vel[j][1];
            }
        }
        
        // Avoid walls
        let acc_wall = [0, 0];
        if (pos[i][0] < wall_range) {
            acc_wall[0] = Math.abs(1 / (pos[i][0]));
        } else if (pos[i][0] > (container.offsetWidth - wall_range)) {
            acc_wall[0] = -Math.abs(1 / (container.offsetWidth - pos[i][0]));
        }
        if (pos[i][1] < wall_range) {
            acc_wall[1] = Math.abs(1 / (pos[i][0]));
        } else if (pos[i][1] > (container.offsetHeight - wall_range)) {
            acc_wall[1] = -Math.abs(1 / (container.offsetHeight - pos[i][1]));
        }
        
        // Go to mouse
        let acc_mouse = [mousepos[0] - pos[i][0], mousepos[1] - pos[i][1]];
        let acc_mouse_norm = Math.sqrt(acc_mouse[0] ** 2 + acc_mouse[1] ** 2);
        acc_mouse = [acc_mouse[0] / acc_mouse_norm, acc_mouse[1] / acc_mouse_norm];
        
        // Max separation acceleration
        let acc_sep_norm = Math.sqrt(acc_sep[0] ** 2 + acc_sep[1] ** 2);
        acc_sep = [acc_sep[0] / acc_sep_norm, acc_sep[1] / acc_sep_norm];
        if (isNaN(acc_sep[0])) {
            acc_sep = [0, 0];
        }
        
        // Normalise cohesion acceleration
        let acc_coh_norm = Math.sqrt(acc_coh[0] ** 2 + acc_coh[1] ** 2);
        acc_coh = [acc_coh[0] / acc_coh_norm, acc_coh[1] / acc_coh_norm];
        if (isNaN(acc_coh[0])) {
            acc_coh = [0, 0];
        }
        
        // Calculate neighborhood mean velocity
        vel_ali = [vel_ali[0] / (boids.length-1), vel_ali[1] / (boids.length-1)];
        // Calculate difference between neighborhood mean and boid's self velocity;
        let acc_ali = [vel_ali[0] - vel[i][0], vel_ali[1] - vel[i][1]];
        
        // Calculate raw acceleration before drag
        let acc = [0, 0];
        for (let j = 0; j < 2; j++) {
            acc[j] += strength_noise * (Math.random()-0.5);
            acc[j] += strength_sep * acc_sep[j];
            acc[j] += strength_coh * acc_coh[j];
            acc[j] += strength_ali * acc_ali[j];
            acc[j] += strength_wall * acc_wall[j];
            if (mousepos[0] > 0 & mousepos[1] > 0) {
                acc[j] += strength_mouse * acc_mouse[j];
            }
            
            // Limit acceleration
            if (acc[j] > damping) {
                acc[j] = damping;
            } else if (acc[j] < -damping) {
                acc[j] = -damping;
            }
        }
        
        // Integrate acceleration for velocity and apply drag
        vel[i][0] += damping * acc[0];
        vel[i][1] += damping * acc[1];
        // Normalise velocity
        let vel_norm = Math.sqrt(vel[i][0] ** 2 + vel[i][1] ** 2);
        // console.log(vel_norm)
        vel[i][0] = v * vel[i][0] / vel_norm;
        vel[i][1] = v * vel[i][1] / vel_norm;
        // Integrate velocity for position, wrapping container
        pos[i][0] = Math.max(Math.min(pos[i][0] + vel[i][0], container.offsetWidth), 0);
        pos[i][1] = Math.max(Math.min(pos[i][1] + vel[i][1], container.offsetHeight), 0);
        // Calculate velocity angle
        let theta = -Math.atan2(vel[i][0], vel[i][1]) * 180 / Math.PI;
        // Update SVG element
        boid.setAttribute("transform", "translate(" + pos[i][0] + " " + pos[i][1] + ") rotate(" + theta + ")");
    }
}

function main() {
    if (window.innerWidth > 920) {
        animate();
    }
    requestAnimationFrame(main);
}

main();