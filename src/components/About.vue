<template>
  <div class="container">
    <h1 class="center">About</h1>
    <h2>Rules</h2>
    <h4>Eligibility</h4>

    <p>Anyone can participate in {{ config.competition.name }}. However, due to various reasons, we can only give prizes to teams from the United States. In order for a team to be eligible for prizes, all team members must be affiliated with either a public or private middle or high school in the U.S. or be home-schooled. College students, international students, industry professionals, and anyone else from around the world are allowed to participate, however, they will be ineligible to win prizes.</p>

    <h4>Rules and Restrictions</h4>
    <ol>
      <li><strong>You may use any tool</strong>, subject to the restrictions below, at your disposal to attempt to solve the problems. We especially encourage the use of free and open-source tools. The Prime Directive of CTFs is <em>Google Is Your Friend</em>.
      <li>We're fine with you asking non-team members (or posting on sites like StackOverflow) for technical assistance with pre-existing software while solving problems. For example, getting help from a teacher installing Python on your computer is allowed. However, <strong>only team members may make substantial contributions to solving a problem</strong>. You can't just reword a problem and post it on an online forum to get help.</li>
      <li>Each member of the team must have an account and have a valid email. Each member may only have one account.</li>
      <li><strong>Each team is limited to five members. No exceptions.</strong></li>
      <li><strong>No flag or hint sharing</strong>. Don't accept hints or guidance from anyone except potentially {{ config.competition.name }} staff.</li>
      <li><strong>Do not attempt to attack or interfere with other teams or any servers used in this competition that are not explicitly designated for being hacked in a problem</strong>. Doing so will get you IP banned and disqualified from the competition. We will notify your school as well.</li>
      <li><strong>No brute-force guessing flags.</strong> Feel free to try several flags if you're not sure, but don't try any sort of brute forcing on the flags. We're tracking all of your submissions.</li>
      <li>Finally, have fun and try and learn something new!</li>
    </ol>

    <h4>Scoring</h4>
    <ol>
      <li>Each problem has a point value listed. The team who earns the most points wins the competition. If two teams have the same number of points, the tiebreak is which team reached their top score first.</li>
      <li>The prize winning teams will be contacted by us after the contest ends. More information will be included in the email.</li>
      <li>We reserve the right to require write-ups from the winning teams for any problems we choose as proofs of solution.</li>
      <li>In the event that a team that is ineligible for prizes wins a prize, the next eligible, high school or middle school US team will recieve that prize.</li>
    </ol>

    <p>Anyone who violates these rules will be disqualified. <strong>All decisions made by {{ config.competition.name }} are final.</strong></p>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  data () {
    return {
      config: config
    }
  }
}
</script>
