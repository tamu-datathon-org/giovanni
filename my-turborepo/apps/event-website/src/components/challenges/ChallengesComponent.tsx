import ChallengesTitle from './ChallengesTitle';
import ChallengeCard from "@/components/challenges/ChallengeCard";

export default function ChallengesComponent() {
    return (
        <div id="Challenges" className="flex flex-col items-center gap-2">
            <ChallengesTitle/>

            <div className="grid grid-cols-2 gap-6">
                <ChallengeCard title="Game Recruitment" desc="Coming soon!" details="Coming soon!"/>
                <ChallengeCard title="Voice Command Survival" desc="Coming soon!" details="Coming soon!"/>
                <ChallengeCard title="Ddakji" desc="Coming soon!" details="Coming soon!"/>
                <ChallengeCard title="Rev's Marbles" desc="Coming soon!" details="Coming soon!"/>
                <ChallengeCard title="Red Light Green Light" desc="Coming soon!" details="Coming soon!"/>
                <ChallengeCard title="Cookie's Regression" desc="Coming soon!" details="Coming soon!"/>
            </div>
        </div>);
}