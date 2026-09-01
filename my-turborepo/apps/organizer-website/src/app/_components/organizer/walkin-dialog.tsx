"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CheckCircle2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toDataURL } from "qrcode";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { applicationSchema } from "~/app/apply/validation";
import { SectionCard } from "~/app/apply/application/application-form";
import GenericCombobox from "~/app/_components/genericCombobox";
import GenericInputField from "~/app/_components/genericInputField";
import GenericMultiSelect from "~/app/_components/genericMultiSelect";
import schoolsJson from "~/app/apply/application/application-data/schools.json";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { env } from "~/env";
import { toast } from "~/hooks/use-toast";
import {
  AGE,
  COUNTRIES,
  DIETARY_RESTRICTIONS,
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  GRADUATION_YEARS,
  HACKATHON_EXPERIENCE,
  MAJOR,
  PROGRAMMING_SKILL_LEVELS,
  RACE_OPTIONS,
  SHIRT_SIZES,
} from "~/lib/dropdownOptions";
import { api } from "~/trpc/react";

const EVENT_NAME = env.NEXT_PUBLIC_EVENT_NAME ?? "Datathon";

const SCHOOL_OPTIONS = schoolsJson.map((entry) => ({
  value: entry.schoolName,
  label: entry.schoolName,
}));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Step = "email" | "noAccount" | "existing" | "form" | "success";

const STATUS_STYLES: Record<string, string> = {
  pending: "border-yellow-500/40 bg-yellow-500/20 text-yellow-300",
  accepted: "border-green-500/40 bg-green-500/20 text-green-300",
  rejected: "border-red-500/40 bg-red-500/20 text-red-300",
  waitlisted: "border-blue-500/40 bg-blue-500/20 text-blue-300",
  checkedin: "border-purple-500/40 bg-purple-500/20 text-purple-300",
};

// Shared accent classes so the wizard matches the apply form's cyan theme.
const PRIMARY_BTN =
  "bg-[#01c0cc] text-white hover:bg-[#28979b] disabled:opacity-50";

function buildDefaultValues(email: string): Partial<ApplicationSchema> {
  return {
    firstName: "",
    lastName: "",
    email,
    age: "",
    country: "",
    phoneNumber: "",
    school: "",
    major: "",
    classification: "",
    gradYear: "",
    gender: "",
    hasTeam: "No",
    race: "",
    hackathonsAttended: "",
    experience: "",
    eventSource: "Walk-in",
    shirtSize: "",
    address: "",
    city: "",
    region: "",
    zipCode: "",
    dietaryRestriction: "",
    // `references` is intentionally left undefined (not "") so the schema's
    // .default("") applies; an empty string would fail its .min(1) rule.
    extraInfo: "",
    linkedinUrl: "",
    interestOne: "",
    interestTwo: "",
    interestThree: "",
    liabilityWaiver: true,
    mlhPrivacyPolicy: true,
    mlhEmailConsent: false,
  };
}

interface WalkInDialogProps {
  /** Called after a successful create/accept so the caller can refresh. */
  onCompleted?: () => void;
}

export function WalkInDialog({ onCompleted }: WalkInDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [existingApp, setExistingApp] = useState<{
    status: string;
    firstName: string;
    lastName: string;
  } | null>(null);
  const [loginQr, setLoginQr] = useState("");
  const [successQr, setSuccessQr] = useState("");
  const [assignedFoodGroup, setAssignedFoodGroup] = useState<string | null>(
    null,
  );

  const utils = api.useUtils();
  const createWalkIn = api.application.createWalkIn.useMutation();
  const acceptWalkIn = api.application.acceptWalkIn.useMutation();

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: buildDefaultValues(""),
  });

  const resetWizard = () => {
    setStep("email");
    setEmail("");
    setExistingApp(null);
    setLoginQr("");
    setSuccessQr("");
    setAssignedFoodGroup(null);
    form.reset(buildDefaultValues(""));
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Defer so the close animation isn't interrupted by the state reset.
      setTimeout(resetWizard, 150);
    }
  };

  const handleLookup = async () => {
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Enter a valid email address to look up.",
      });
      return;
    }

    if (!trimmed.toLowerCase().endsWith("@tamu.edu")) {
      toast({
        title: "Heads up",
        description:
          "This isn't a @tamu.edu email. Accounts require a TAMU email to sign in.",
      });
    }

    setIsLookingUp(true);
    try {
      const result = await utils.application.lookupWalkIn.fetch({
        eventName: EVENT_NAME,
        email: trimmed,
      });

      if (!result.accountExists) {
        const qr = await toDataURL(`${window.location.origin}/login`);
        setLoginQr(qr);
        setStep("noAccount");
        return;
      }

      if (result.application) {
        setExistingApp({
          status: result.application.status,
          firstName: result.application.firstName,
          lastName: result.application.lastName,
        });
        setStep("existing");
        return;
      }

      form.reset(buildDefaultValues(trimmed));
      setStep("form");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lookup failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not look up this email.",
      });
    } finally {
      setIsLookingUp(false);
    }
  };

  const finishSuccess = async (foodGroup: string | null) => {
    const qr = await toDataURL(email.trim());
    setSuccessQr(qr);
    setAssignedFoodGroup(foodGroup);
    setStep("success");
    onCompleted?.();
  };

  const handleAccept = async () => {
    try {
      const result = await acceptWalkIn.mutateAsync({
        eventName: EVENT_NAME,
        email: email.trim(),
      });
      toast({
        variant: "success",
        title: "Application accepted",
        description: "The participant has been accepted.",
      });
      await finishSuccess(result?.foodGroup ?? null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Could not accept",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  const onSubmit = async (data: ApplicationSchema) => {
    const walkInEmail = email.trim();

    const applicationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: walkInEmail,
      age: data.age,
      country: data.country,
      phoneNumber: data.phoneNumber,
      school: data.school,
      major: data.major,
      classification: data.classification,
      gradYear: Number(data.gradYear),
      gender: data.gender,
      race: data.race,
      hackathonsAttended: data.hackathonsAttended,
      experience: data.experience,
      hasTeam: data.hasTeam || "No",
      eventSource: "Walk-in",
      shirtSize: data.shirtSize,
      address: [data.address, data.city, data.region, data.zipCode]
        .filter(Boolean)
        .join("|"),
      dietaryRestriction: data.dietaryRestriction ?? null,
      mlhEmailConsent: data.mlhEmailConsent,
      // Skipped fields. `references` is omitted entirely (not "") because its
      // schema has .min(1); the server fills in the "" default for us.
      interestOne: "",
      interestTwo: "",
      interestThree: "",
      extraInfo: null,
      linkedinUrl: "",
    };

    try {
      const result = await createWalkIn.mutateAsync({
        eventName: EVENT_NAME,
        email: walkInEmail,
        applicationData,
      });
      toast({
        variant: "success",
        title: "Walk-in registered",
        description: `${data.firstName} ${data.lastName} was accepted.`,
      });
      await finishSuccess(result?.foodGroup ?? null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  const handleFormError = () => {
    toast({
      variant: "destructive",
      title: "Missing required information",
      description: "Please fill in all required fields.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={PRIMARY_BTN}>
          <UserPlus className="mr-2 h-4 w-4" />
          Register Walk-in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-2 border-[#374151] bg-[#121723] text-neutral-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white">
            {EVENT_NAME} Walk-in
          </DialogTitle>
          <DialogDescription className="text-neutral-300">
            {step === "email" &&
              "Look up the participant's account by email to get started."}
            {step === "noAccount" &&
              "No account found. Have them sign in, then re-check."}
            {step === "existing" &&
              "This participant already has an application."}
            {step === "form" &&
              "Fill in the essentials. Skipped questions are left blank and they're auto-accepted."}
            {step === "success" &&
              "All set! They can check in with this QR code."}
          </DialogDescription>
        </DialogHeader>

        {step === "email" && (
          <SectionCard title="Find Participant">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xl text-white">Participant email</label>
                <Input
                  autoFocus
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="netid@tamu.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void handleLookup();
                  }}
                  disabled={isLookingUp}
                  className="bg-white text-neutral-900 placeholder-neutral-500"
                />
              </div>
              <Button
                onClick={() => void handleLookup()}
                disabled={isLookingUp}
                className={PRIMARY_BTN}
              >
                {isLookingUp ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Looking up...
                  </>
                ) : (
                  "Look up"
                )}
              </Button>
            </div>
          </SectionCard>
        )}

        {step === "noAccount" && (
          <SectionCard title="No Account Found">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-neutral-300">
                <span className="font-semibold text-white">{email}</span> has no
                account yet. Ask them to scan this code and sign in with their
                TAMU email, then re-check.
              </p>
              {loginQr && (
                <Image
                  src={loginQr}
                  alt="Login QR code"
                  width={176}
                  height={176}
                  unoptimized
                  className="rounded-lg border-4 border-[#4b5563] bg-white p-1"
                />
              )}
              <div className="flex w-full gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep("email")}
                >
                  Back
                </Button>
                <Button
                  className={`flex-1 ${PRIMARY_BTN}`}
                  onClick={() => void handleLookup()}
                  disabled={isLookingUp}
                >
                  {isLookingUp ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Re-checking...
                    </>
                  ) : (
                    "Re-check"
                  )}
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {step === "existing" && existingApp && (
          <SectionCard title="Existing Application">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-[#374151] bg-[#111827] p-4">
                <p className="text-sm text-neutral-400">Participant</p>
                <p className="text-lg font-semibold text-white">
                  {existingApp.firstName} {existingApp.lastName}
                </p>
                <p className="text-sm text-neutral-400">{email}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-neutral-400">
                    Current status:
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${
                      STATUS_STYLES[existingApp.status.toLowerCase()] ??
                      "border-neutral-700 bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {existingApp.status}
                  </span>
                </div>
              </div>

              {existingApp.status.toLowerCase() === "accepted" ? (
                <p className="text-sm text-emerald-300">
                  This participant is already accepted.
                </p>
              ) : (
                <p className="text-sm text-neutral-300">
                  Accept them now without changing any of their existing
                  information.
                </p>
              )}

              <div className="flex w-full gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep("email")}
                >
                  Back
                </Button>
                <Button
                  className={`flex-1 ${PRIMARY_BTN}`}
                  onClick={() => void handleAccept()}
                  disabled={
                    acceptWalkIn.isPending ||
                    existingApp.status.toLowerCase() === "accepted"
                  }
                >
                  {acceptWalkIn.isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Accepting...
                    </>
                  ) : existingApp.status.toLowerCase() === "accepted" ? (
                    "Already accepted"
                  ) : (
                    "Accept now"
                  )}
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {step === "form" && (
          <Form {...form}>
            <form
              onSubmit={(e) =>
                void form.handleSubmit(onSubmit, handleFormError)(e)
              }
              className="space-y-6"
            >
              <div className="rounded-xl border-2 border-[#4b5563] bg-[#1f2937] px-6 py-4">
                <span className="text-sm text-neutral-400">Account: </span>
                <span className="font-semibold text-white">{email}</span>
              </div>

              <SectionCard title="Personal Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <GenericInputField
                    name="firstName"
                    label="First Name"
                    required
                    placeholder="John"
                  />
                  <GenericInputField
                    name="lastName"
                    label="Last Name"
                    required
                    placeholder="Doe"
                  />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <GenericInputField
                    name="phoneNumber"
                    label="Phone Number"
                    required
                    placeholder="1234567890"
                  />
                  <GenericCombobox name="age" label="Age" options={AGE} required />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <GenericCombobox
                    name="country"
                    label="Country of Residence"
                    options={COUNTRIES}
                    required
                  />
                  <GenericCombobox
                    name="gender"
                    label="Gender"
                    options={GENDER_OPTIONS}
                    required
                  />
                </div>

                <div className="mt-6">
                  <GenericCombobox
                    name="race"
                    label="What ethnicity do you identify with?"
                    options={RACE_OPTIONS}
                    required
                  />
                </div>
              </SectionCard>

              <SectionCard title="Education">
                <div className="mb-6">
                  <GenericCombobox
                    name="school"
                    label="School"
                    options={SCHOOL_OPTIONS}
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <GenericCombobox
                    name="major"
                    label="Major"
                    options={MAJOR}
                    required
                  />
                  <GenericCombobox
                    name="classification"
                    label="Level of Study"
                    options={EDUCATION_LEVELS}
                    required
                  />
                </div>

                <div className="mt-6">
                  <GenericCombobox
                    name="gradYear"
                    label="Anticipated Graduation Year"
                    options={GRADUATION_YEARS}
                    required
                  />
                </div>
              </SectionCard>

              <SectionCard title="Experience">
                <div className="grid gap-6 md:grid-cols-2">
                  <GenericCombobox
                    name="hackathonsAttended"
                    label="Hackathons Attended"
                    options={HACKATHON_EXPERIENCE}
                    required
                  />
                  <GenericCombobox
                    name="experience"
                    label="Programming Experience Level"
                    options={PROGRAMMING_SKILL_LEVELS}
                    required
                  />
                </div>

                <div className="mt-6">
                  <GenericCombobox
                    name="shirtSize"
                    label="Shirt Size"
                    options={SHIRT_SIZES}
                    required
                  />
                </div>
              </SectionCard>

              <SectionCard title="Address & Logistics">
                <div className="mb-6">
                  <GenericInputField
                    name="address"
                    label="Street Address"
                    required
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <GenericInputField
                    name="city"
                    label="City"
                    required
                    placeholder="College Station"
                  />
                  <GenericInputField
                    name="region"
                    label="State/Region"
                    required
                    placeholder="TX"
                  />
                  <GenericInputField
                    name="zipCode"
                    label="Zip Code"
                    required
                    placeholder="77840"
                  />
                </div>

                <div className="mt-6">
                  <GenericMultiSelect
                    name="dietaryRestriction"
                    label="Dietary Restrictions"
                    placeholder="Select dietary restrictions (if any)"
                    options={DIETARY_RESTRICTIONS}
                    required={false}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Legal & Consent">
                <FormField
                  control={form.control}
                  name="mlhEmailConsent"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 rounded-lg border-2 border-neutral-700 p-4 transition-all hover:border-[#01c0cc]">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 !border-2 !border-white dark:!border-white"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-base font-medium leading-relaxed text-neutral-100">
                          <span className="text-neutral-400">(Optional) </span>
                          Participant authorizes MLH to send occasional emails
                          about relevant events, career opportunities, and
                          community announcements.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </SectionCard>

              <div className="flex gap-3 pb-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep("email")}
                  disabled={createWalkIn.isPending}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className={`flex-1 ${PRIMARY_BTN}`}
                  disabled={createWalkIn.isPending}
                >
                  {createWalkIn.isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register & Accept"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === "success" && (
          <SectionCard title="Accepted">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-lg font-semibold">All set</span>
              </div>
              <p className="text-sm text-neutral-300">
                <span className="font-semibold text-white">{email}</span> is
                accepted and ready for check-in.
              </p>
              {assignedFoodGroup && (
                <p className="rounded-lg border border-[#374151] bg-[#111827] px-3 py-2 text-sm">
                  <span className="text-neutral-400">Lunch group: </span>
                  <span className="font-semibold text-white">
                    {assignedFoodGroup}
                  </span>
                </p>
              )}
              {successQr && (
                <Image
                  src={successQr}
                  alt="Check-in QR code"
                  width={176}
                  height={176}
                  unoptimized
                  className="rounded-lg border-4 border-[#4b5563] bg-white p-1"
                />
              )}
              <div className="flex w-full gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={resetWizard}
                >
                  Register another
                </Button>
                <Button
                  className={`flex-1 ${PRIMARY_BTN}`}
                  onClick={() => handleOpenChange(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </SectionCard>
        )}
      </DialogContent>
    </Dialog>
  );
}
