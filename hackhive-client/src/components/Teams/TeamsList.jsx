import React from "react"

const TeamsList = ({ teams = [] }) => {
	return (
		<div>
			<h2>List of Teams</h2>
			<ul>
				{teams.map((team) => (
					<li key={team.id}>{team.name}</li>
				))}
			</ul>
		</div>
	)
}

export default TeamsList
