"use client"
import { getUser, updateUser, User } from "@/api/user";
import EducationCard from "@/components/profile/EducationCard";
import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import SkillsCard from "@/components/profile/SkillsCard";
import WorkExpCard from "@/components/profile/WorkExpCard";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, CircularProgress, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BADGE_DESCRIPTIONS: Record<string, string> = {
  "Problem solver": "Awarded for excellent problem-solving skills.",
  "C++": "Expertise in C++ programming.",
  "Dueller": "Defeated 100 opponents in coding battles.",
};

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editWork, setEditWork] = useState(false);
  const [workDrafts, setWorkDrafts] = useState<User['workExperience']>([]);
  const [editEdu, setEditEdu] = useState(false);
  const [eduDrafts, setEduDrafts] = useState<User['education']>([]);
  const [hoverBadge, setHoverBadge] = useState<string | null>(null);

  useEffect(() => {
    getUser(userId as string).then(u => {
      setUser(u);
      setWorkDrafts(u.workExperience ? [...u.workExperience] : []);
      setEduDrafts(u.education ? [...u.education] : []);
      setLoading(false);
    });
  }, [userId]);

  if (loading || !user) return <CircularProgress  />;

  const handleWorkAdd = () => {
    setWorkDrafts([...workDrafts, { position: " ", company: " ", start: " ", end: " ", location: " ", notes: " " }]);
    setEditWork(true);
  };
  const handleWorkSave = () => {
    setEditWork(false);
    const updatedUser = { ...user, workExperience: workDrafts };
    setUser(updatedUser);
    updateUser(updatedUser);
  };
  const handleWorkRemove = (index: number) => {
    const updatedWorkDrafts = workDrafts.filter((_, i) => i !== index);
    setWorkDrafts(updatedWorkDrafts);
    const updatedUser = { ...user, workExperience: updatedWorkDrafts };
    setUser(updatedUser);
    updateUser(updatedUser);
  };

  // Education Handlers  
  const handleEduAdd = () => {
    setEduDrafts([...eduDrafts, { institution: " ", major: " ", degree: " ", start: " ", end: " ", gpa: 0, notes: " " }]);
    setEditEdu(true);
  };
  const handleEduSave = () => {
    setEditEdu(false);
    const updatedUser = { ...user, education: eduDrafts };
    setUser(updatedUser);
    updateUser(updatedUser);
  };
  const handleEduRemove = (index: number) => {
    const updatedEduDrafts = eduDrafts.filter((_, i) => i !== index);
    setEduDrafts(updatedEduDrafts);
    const updatedUser = { ...user, education: updatedEduDrafts };
    setUser(updatedUser);
    updateUser(updatedUser);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: "5vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {/* Personal Info */}
        <PersonalInformationCard user={user} setUser={setUser} />

        {/* TODO: Add Rating */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>TODO: add rating</Typography>
          </CardContent>
        </Card>

        {/* Skills */}
        <SkillsCard user={user} setUser={setUser} />
      </Box>

      {/* Work Experience */}
      <Box sx={{ display: "flex", gap: 10 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Work Experience</Typography>
            <Divider sx={{ flex: 1, borderRadius: 2, borderWidth: 1, mx: 2, borderColor: "#27375E" }} />
            {editWork ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton onClick={handleWorkSave} size="small" color="success"><CheckIcon /></IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setEditWork(true)} size="small" sx={{ color: "text.secondary" }}><EditIcon /></IconButton>
            )}
          </Box>
          {workDrafts.map((work, idx) => (
            <WorkExpCard key={idx} workDrafts={workDrafts} setWorkDrafts={setWorkDrafts} work={work} index={idx} editWork={editWork} handleWorkRemove={() => handleWorkRemove(idx)} />
          ))}
          {editWork && (
            <Box sx={{ alignSelf: "center" }}>
              <IconButton onClick={handleWorkAdd} size="small" color="primary"><AddIcon /></IconButton>
            </Box>
          )}
        </Box>

        {/* Education */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Education</Typography>
            <Divider sx={{ flex: 1, borderRadius: 2, borderWidth: 1, mx: 2, borderColor: "#27375E" }} />
            {editEdu ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton onClick={handleEduSave} size="small" color="success"><CheckIcon /></IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setEditEdu(true)} size="small" sx={{ color: "text.secondary" }}><EditIcon /></IconButton>
            )}
          </Box>
          {eduDrafts.map((edu, idx) => (
            <EducationCard key={idx} eduDrafts={eduDrafts} setEduDrafts={setEduDrafts} edu={edu} index={idx} editEdu={editEdu} handleEduRemove={() => handleEduRemove(idx)} />
          ))}
          {editEdu && (
            <Box sx={{ alignSelf: "center" }}>
              <IconButton onClick={handleEduAdd} size="small" color="primary"><AddIcon /></IconButton>
            </Box>
          )}
        </Box>
      </Box>

      {/* Badges */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Badges</Typography>
          <Divider sx={{ flex: 1, borderRadius: 2, borderWidth: 1, borderColor: "#27375E" }} />
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          {["Problem solver", "C++", "Dueller"].map(badge => (
            <Tooltip
              key={badge}
              title={BADGE_DESCRIPTIONS[badge]}
              open={hoverBadge === badge}
              onOpen={() => setHoverBadge(badge)}
              onClose={() => setHoverBadge(null)}
              placement="top"
            >
              <Card
                elevation={3}
                sx={{
                  width: 120, height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  bgcolor: "#1a233a", color: "#fff", fontWeight: 600, fontSize: 18, cursor: "pointer", textAlign: "center"
                }}
                onMouseEnter={() => setHoverBadge(badge)}
                onMouseLeave={() => setHoverBadge(null)}
              >
                {badge}
              </Card>
            </Tooltip>
          ))}
        </Box>
      </Box>
      {/* TODO: Certifications */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Certifications</Typography>
          <Divider sx={{ flex: 1, borderRadius: 2, borderWidth: 1, borderColor: "#27375E" }} />
        </Box>
        <Box>
          <Box sx={{ width: 120, height: 120, bgcolor: "#27375E", borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 18, color: "#fff" }}>TODO: Add</Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
