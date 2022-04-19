var velocityIterations = 8;
var positionIterations = 10;

export default class LiquidFunPhysics {
    constructor(
        world,
        {
            scale = 10,
            center = [0, 0],
            flip = false
        } = {}
    ) {
        this.world = world;
        this.scale = scale;
        this.center = center;
        this.flip = flip ? -1 : 1;
    }

    update(dt) {
        this.world.Step(dt / 1000, velocityIterations, positionIterations);

        // World traversal adopted from liquidfun testbed:
        // https://github.com/google/liquidfun/blob/master/liquidfun/Box2D/lfjs/testbed/renderer.js

        for (var body of world.bodies) {
            var transform = body.GetTransform();
            for (var fixture of body.fixtures) {
                this._updateSprite(fixture.shape, transform);
            }
        }

        for (var system of world.particleSystems) {
            for (var group of system.particleGroups) {
                this._updateParticles(system, group);
            }
        }
    }

    

    _updateSprite(shape, transform) {
        if (!shape.phaserSprite) {
            return;
        }

        var transformedPos = new b2Vec2();
        var centroidPos = new b2Vec2();
        b2Vec2.Add(centroidPos, shape.phaserCentroid || new b2Vec2(0, 0), shape.position)
        b2Vec2.Mul(transformedPos, transform, centroidPos);
        const phaserPos = this.toPhaserCoord(transformedPos);
        shape.phaserSprite.setPosition(phaserPos.x, phaserPos.y);
        shape.phaserSprite.setAngle(this.flip * 180 / Math.PI * Math.atan2(transform.q.s, transform.q.c));
    }

    toPhaserCoord(pos) {
        return {
            x: this.center[0] + pos.x * this.scale,
            y: this.center[1] + pos.y * this.scale * this.flip
        };
    }

    fromPhaserCoord(pos) {
        return new b2Vec2(
            (pos.x - this.center[0]) / this.scale,
            (pos.y - this.center[1]) / this.scale / this.flip
        );
    }

        _updateParticles(system, group) {
        const emitters = group.phaserParticleEmitters;
        if (!emitters) {
            return;
        }

        const particles = system.GetPositionBuffer();
        const color = system.GetColorBuffer();
        const offset = group.GetBufferIndex();
        const count = group.GetParticleCount();

        for (var emitter of emitters) {
            emitter.setSpeed(0);
            emitter.setLifespan(Infinity);
            emitter.stop();
            const xoffset = emitter.x.propertyValue;
            const yoffset = emitter.y.propertyValue;

            emitter.emitParticle(count - emitter.alive.length);  // ensure capacity

            for (var i = 0; i < count; i++) {
                const particle = emitter.alive[i];
                const newPos = this.toPhaserCoord({
                    x: particles[(i + offset) * 2],
                    y: particles[(i + offset) * 2 + 1]
                });
                particle.x = newPos.x + xoffset;
                particle.y = newPos.y + yoffset;

                // To use LiquidFun's colors instead of Phaser's:
                // particle.tint =
                //       (color[(i + offset) * 4] << 16)
                //     + (color[(i + offset) * 4 + 1] << 8)
                //     + (color[(i + offset) * 4 + 2]);
            }
        }
    }
}
