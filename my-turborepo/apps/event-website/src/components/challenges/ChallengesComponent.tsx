import ChallengesTitle from './ChallengesTitle';
import ChallengeCard from "@/components/challenges/ChallengeCard";

export default function ChallengesComponent() {
    return (
        <div id="Challenges" className="flex flex-col items-center gap-4">
            <ChallengesTitle/>

            <div className="grid grid-cols-2 gap-4">
                <ChallengeCard title="Game Recruitment" desc="Data manipulation" details="Coming soon!"/>
                <ChallengeCard title="Voice Command Survival" desc="Data manipulation" details="Coming soon!"/>
                <ChallengeCard title="Ddakji" desc="Data manipulation" details="Coming soon!"/>
                <ChallengeCard title="Rev's Marbles" desc="Data manipulation" details="Coming soon!"/>
                <ChallengeCard title="Red Light Green Light" desc="Data manipulation" details="Coming soon!"/>
                <ChallengeCard title="Cookie's Regression" desc="Data manipulation" details="Coming soon!"/>
            </div>
        </div>
    );
}