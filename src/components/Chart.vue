<template>
  <div class="chart-container">
    <svg id="graph" class="chart" transform="scale(1, -1)">
      <g v-for="line in svgLines">
        <polyline vector-effect="non-scaling-stroke" onmouseover="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '1');"
                  onmouseout="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '0');"
                  fill="none"
                  stroke="none"
                  stroke-opacity="0"
                  stroke-width="10"
                  :points="line.points.join(' ')"
                  style="cursor: pointer;"
        />
        <polyline vector-effect="non-scaling-stroke" onmouseover="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '1');"
                  onmouseout="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '0');"
                  fill="none"
                  :alt="line.name"
                  stroke-width="3"
                  :points="line.points.join(' ')"
                  style="cursor: pointer;"
        />
        <circle onmouseover="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '1');"
                onmouseout="evt.target.parentNode.getElementsByClassName('label')[0].setAttribute('opacity', '0');"
                style="cursor: pointer;"
                v-for="point in line.points.slice(1)" :cx="point[0]" :cy="point[1]" r="3">
        </circle>
        <g class="label" style="transition: opacity 0.4s;" opacity="0">
          <text transform="scale(8, -8)" :y="-(maxY-minY-175)/8" font-family="Orbitron" :fill="line.color">{{ line.name }}</text>
          <text transform="scale(6, -6)" :y="-(maxY-minY-325)/6" font-family="Orbitron" fill="white">{{ line.points.slice(-1)[0][1] }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

export default {
  data () {
    return {
      svgLines: [],
      lines: [],
      teams: [],
      config: config
    }
  },
  computed: {
    maxX () {
      return this.lines.reduce((max, line) => line.points.reduce((maxL, point) => maxL > point[0] ? maxL : point[0], 0) > max ? line.points.reduce((maxL, point) => maxL > point[0] ? maxL : point[0], 0) : max, 0)
    },
    minX () {
      return this.lines.reduce((min, line) => line.points.reduce((minL, point) => minL < point[0] ? minL : point[0], Infinity) < min ? line.points.reduce((minL, point) => minL < point[0] ? minL : point[0], Infinity) : min, Infinity)
    },
    maxY () {
      return this.lines.reduce((max, line) => line.points.reduce((maxL, point) => maxL > point[1] ? maxL : point[1], 0) > max ? line.points.reduce((maxL, point) => maxL > point[1] ? maxL : point[1], 0) : max, 0)
    },
    minY () {
      return this.lines.reduce((min, line) => line.points.reduce((minL, point) => minL < point[1] ? minL : point[1], Infinity) < min ? line.points.reduce((minL, point) => minL < point[1] ? minL : point[1], Infinity) : min, Infinity)
    }
  },
  methods: {
    updatePoints (teams) {
      this.teams = teams
      var lines = []
      axios.get(config.api_url + '/challenges').then(function (response) {
        var challenges = response.data
        for (var t = 0; t < teams.length; t++) {
          if (teams[t].solves.length > 0) {
            lines.push({
              points: [[+new Date(teams[t].created), 0]]
            })
            var score = 0
            for (var s = 0; s < teams[t].solves.length; s++) {
              score += challenges.filter(challenge => challenge.id === teams[t].solves[s].challenge)[0].value
              var time = +new Date(teams[t].solves[s].time)
              lines[lines.length - 1].points.push([
                time,
                score
              ])
            }
          }
        }
        this.lines = lines
        lines = []
        for (var l = 0; l < this.lines.length; l++) {
          lines[l] = this.lines[l]
          for (var p = 0; p < lines[l].points.length; p++) {
            lines[l].points[p] = [this.svgX(lines[l].points[p][0]), this.svgY(lines[l].points[p][1])]
          }
        }
        this.svgLines = lines
      }.bind(this))
    },
    svgX (x) {
      return (x - this.minX) / (this.maxX - this.minX) * (document.getElementById('graph').getBoundingClientRect().width - 20)
    },
    svgY (y) {
      return (y - this.minY) / (this.maxY - this.minY) * (document.getElementById('graph').getBoundingClientRect().height - 20)
    },
    update () {
      this.updatePoints(this.teams)
    }
  },
  mounted () {
    window.addEventListener('resize', this.update)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.update)
  }
}
</script>

<style lang="scss">
@import '../styles/colors.scss';

.chart-container {
  position: relative;
  width: 100%;
  height: 8em;
  border-bottom: 0.1em solid $secondary;
  border-left: 0.1em solid $secondary;
  margin-bottom: 1em;
}
.chart {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: fill;
  padding-top: 0.5em;

  polyline {
    stroke: $primary;
  }

  circle {
    fill: $primary;
  }
}
</style>
