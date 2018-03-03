<template>
  <div class="container-container">
    <div class="chart-container">
      <svg id="graph" class="chart" transform="scale(1, -1)">
        <g v-for="line in svgLines">
          <circle v-for="point in line.points.slice(1)" :cx="point[0]" :cy="point[1]" r="3"></circle>
          <polyline fill="none"
            :alt="line.name"
            stroke-width="3"
            :points="line.points.join(' ')"
          />
          <polyline @mouseover="showTooltip(line.name, line.score)"
            @mouseleave="hideTooltip"
            fill="none"
            stroke="none"
            stroke-opacity="0"
            stroke-width="15"
            :points="line.points.join(' ')"
            style="cursor: pointer;"
          />
        </g>
      </svg>
      <div class="tooltip" id="tooltip">{{ tooltipMessage }}</div>
    </div>
    <div class="labels"><div class="label" v-for="day in days">{{ day }}</div></div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

async function getChallenges () {
  return axios.get(config.api_url + '/challenges')
}

export default {
  data () {
    return {
      svgLines: [],
      lines: [],
      teams: [],
      config: config,
      tooltipMessage: '',
      tooltipTimeout: null,
      days: []
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
    updatePoints (teams, keepChallenges) {
      var promise
      if (!this.challenges || !keepChallenges) {
        promise = getChallenges()
      } else {
        promise = new Promise(function (resolve, reject) { resolve() })
      }
      promise.then(function (response) {
        if (response) {
          this.challenges = response.data
        }
        var challenges = this.challenges
        this.teams = teams
        var lines = []
        for (var t = 0; t < teams.length; t++) {
          if (teams[t].solves.length > 0) {
            lines.push({
              points: [[+new Date(teams[t].created), 0]],
              name: teams[t].name,
              score: teams[t].score
            })
            var score = 0
            for (var s = 0; s < teams[t].solves.length; s++) {
              score += challenges.filter(challenge => challenge.id === teams[t].solves[s].challenge.id)[0].value
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
        var days = []
        for (var timestamp = this.minX; timestamp < this.maxX; timestamp += 86400000) {
          days.push(((new Date(timestamp)).getMonth() + 1).toString() + '/' + (new Date(timestamp)).getDate().toString())
        }
        var lastDay = ((new Date(this.maxX)).getMonth() + 1).toString() + '/' + (new Date(this.maxX)).getDate().toString()
        if (days.indexOf(lastDay) == -1) { days.push(lastDay) }
        this.days = days
      }.bind(this))
    },
    svgX (x) {
      return (x - this.minX) / (this.maxX - this.minX) * (document.getElementById('graph').getBoundingClientRect().width - 20)
    },
    svgY (y) {
      return (y - this.minY) / (this.maxY - this.minY) * (document.getElementById('graph').getBoundingClientRect().height - 20)
    },
    update () {
      this.updatePoints(this.teams, true)
    },
    showTooltip (name, score) {
      clearTimeout(this.tooltipTimeout)
      this.tooltipMessage = name + ' · ' + score + ' points'
      document.getElementById('tooltip').style.display = 'block'
      this.tooltipTimeout = setTimeout(function () { document.getElementById('tooltip').style.opacity = '1' }, 0)
    },
    hideTooltip () {
      clearTimeout(this.tooltipTimeout)
      document.getElementById('tooltip').style.opacity = '0'
      this.tooltipTimeout = setTimeout(function () {
        document.getElementById('tooltip').style.display = 'none'
      }, 100)
    },
    moveTooltip (event) {
      document.getElementById('tooltip').style.top = event.clientY + 10 + 'px'
      document.getElementById('tooltip').style.left = event.clientX + 10 + 'px'
    }
  },
  mounted () {
    window.addEventListener('resize', this.update)
    window.addEventListener('mousemove', this.moveTooltip)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.update)
    window.removeEventListener('mousemove', this.moveTooltip)
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

.tooltip {
  opacity: 0;
  display: none;
  position: fixed;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 1em;
  padding: 0.5em;
  font-size: 0.8em;
  transition: opacity 0.07s;
}

.container-container {
  margin-bottom: 1em;
}

.labels {
  @media screen and (max-width: 768px) {
    font-size: 0.8em;
  }

  display: flex;
  justify-content: space-between;
  .label {
    display: inline-block;
  }
}
</style>
