const poll = new Map();
function addOption(option)
{
  if(option === "")
  {
    return "Option cannot be empty.";
  }
  if(poll.has(option))
  {
    return `Option "${option}" already exists.`;
  }
  poll.set(option,new Set());
  return `Option "${option}" added to the poll.`;
}

function vote(option, voterId)
{
  if(!poll.has(option))
  {
    return `Option "${option}" does not exist.`;
  }
  const voters = poll.get(option);
  if(voters.has(voterId))
  {
    return `Voter ${voterId} has already voted for "${option}".`
  }
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`
}

function displayResults() {
  let results = "Poll Results:";

  poll.forEach((voters, option) => {
    results += `\n${option}: ${voters.size} votes`;
  });

  return results;
}

console.log(addOption(""));
console.log(addOption("cycle"));
console.log(addOption("cycle"));
console.log(addOption("glass"));
console.log(addOption("fan"));

console.log(vote("car","nfk0"))
console.log(vote("cycle","nfk1"));
console.log(vote("cycle","nfk1"));
console.log(vote("glass","nfk2"));
console.log(vote("cycle","nfk2"));
console.log(vote("fan","nfk3"));
console.log(vote("cycle","nfk4"));
console.log(vote("cycle","nfk5"));
console.log(vote("glass","nfk6"));

console.log(displayResults());
