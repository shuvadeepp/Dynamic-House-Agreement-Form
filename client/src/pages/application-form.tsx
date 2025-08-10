import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building, Phone, IndianRupee, ClipboardList, Send, RotateCcw } from "lucide-react";
import FormConfirmationModal from "@/components/form-confirmation-modal";

interface FormData {
  agremntMadeOn: string;
  effectiveFromDate: string;
  tenantName: string;
  tenantFatherName: string;
  tenantReligion: string;
  tenantOccupation: string;
  tenantAllowFloor: string;
  tenantRoomConsist: string;
  tenantResiding: string;
  rentAmt: string;
  amtinWord: string;
  tenantRefundAmt: string;
  tenantIncreaseAmt: string;
}

export default function ApplicationForm() {
  const [, setLocation] = useLocation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setFormDataToSubmit(data);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (formDataToSubmit) {
      // Store form data in localStorage for the view page
      localStorage.setItem('agreementFormData', JSON.stringify(formDataToSubmit));
      setLocation('/view');
    }
    setShowConfirmModal(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
    setFormDataToSubmit(null);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Card className="overflow-hidden">
          <CardHeader className="gradient-header text-white p-6">
            <h2 className="text-xl font-semibold">Dynamic House Agreement Form</h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill out all required information to generate your lease agreement
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Agreement Date Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="agremntMadeOn" className="text-sm font-medium text-gray-700">
                    Agreement Made On <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="agremntMadeOn"
                    type="date"
                    {...register("agremntMadeOn", { required: "Agreement date is required" })}
                    className="mt-2"
                    data-testid="input-agreement-date"
                  />
                  {errors.agremntMadeOn && (
                    <p className="text-red-500 text-sm mt-1">{errors.agremntMadeOn.message}</p>
                  )}
                </div>
                {/* <div>
                  <Label htmlFor="effectiveFromDate" className="text-sm font-medium text-gray-700">
                    Effective From Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="effectiveFromDate"
                    type="date"
                    {...register("effectiveFromDate", { required: "Effective date is required" })}
                    className="mt-2"
                    data-testid="input-effective-date"
                  />
                  {errors.effectiveFromDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.effectiveFromDate.message}</p>
                  )}
                </div> */}
              </div>

              {/* Personal Information Section */}
              <div className="form-section">
                <h3>
                  <User className="text-primary mr-2" size={20} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tenantName" className="text-sm font-medium text-gray-700">
                      Name of the Tenant <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantName"
                      placeholder="Enter tenant's full name"
                      {...register("tenantName", { required: "Tenant name is required" })}
                      className="mt-2"
                      data-testid="input-tenant-name"
                    />
                    {errors.tenantName && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantFatherName" className="text-sm font-medium text-gray-700">
                      S/o or D/o. (Father's Name) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantFatherName"
                      placeholder="Enter father's name"
                      {...register("tenantFatherName", { required: "Father's name is required" })}
                      className="mt-2"
                      data-testid="input-father-name"
                    />
                    {errors.tenantFatherName && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantFatherName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantReligion" className="text-sm font-medium text-gray-700">
                      Religion <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => setValue("tenantReligion", value)}>
                      <SelectTrigger className="mt-2" data-testid="select-religion">
                        <SelectValue placeholder="-- Select Religion --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="Sikh">Sikh</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.tenantReligion && (
                      <p className="text-red-500 text-sm mt-1">Religion is required</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantOccupation" className="text-sm font-medium text-gray-700">
                      Tenant Occupation <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantOccupation"
                      placeholder="Enter occupation"
                      {...register("tenantOccupation", { required: "Occupation is required" })}
                      className="mt-2"
                      data-testid="input-occupation"
                    />
                    {errors.tenantOccupation && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantOccupation.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Information Section */}
              <div className="form-section">
                <h3>
                  <Building className="text-primary mr-2" size={20} />
                  Property Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tenantAllowFloor" className="text-sm font-medium text-gray-700">
                      Allowed Floors <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantAllowFloor"
                      placeholder="e.g., Ground Floor, 1st Floor"
                      {...register("tenantAllowFloor", { required: "Allowed floors is required" })}
                      className="mt-2"
                      data-testid="input-allowed-floors"
                    />
                    {errors.tenantAllowFloor && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantAllowFloor.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantRoomConsist" className="text-sm font-medium text-gray-700">
                      Room's Consisting Of <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantRoomConsist"
                      placeholder="e.g., 2 Bedrooms, 1 Kitchen, 1 Bathroom"
                      {...register("tenantRoomConsist", { required: "Room details are required" })}
                      className="mt-2"
                      data-testid="input-rooms-consisting"
                    />
                    {errors.tenantRoomConsist && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantRoomConsist.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="tenantResiding" className="text-sm font-medium text-gray-700">
                    Tenant Residing At <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="tenantResiding"
                    rows={4}
                    placeholder="Enter residing address"
                    {...register("tenantResiding", { required: "Residing address is required" })}
                    className="mt-2 resize-none"
                    data-testid="textarea-residing-address"
                  />
                  {errors.tenantResiding && (
                    <p className="text-red-500 text-sm mt-1">{errors.tenantResiding.message}</p>
                  )}
                </div>
              </div>

              {/* Rental Information Section */}
              <div className="form-section">
                <h3>
                  <IndianRupee className="text-primary mr-2" size={20} />
                  INDENTURE WITNESSETH AS FOLLOWS FORM
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="rentAmt" className="text-sm font-medium text-gray-700">
                      Rent Amount <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="rentAmt"
                      type="number"
                      placeholder="Enter monthly rent amount"
                      {...register("rentAmt", { required: "Rent amount is required" })}
                      className="mt-2"
                      data-testid="input-rent-amount"
                    />
                    {errors.rentAmt && (
                      <p className="text-red-500 text-sm mt-1">{errors.rentAmt.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="amtinWord" className="text-sm font-medium text-gray-700">
                      Amount In Word <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="amtinWord"
                      placeholder="Enter amount in words"
                      {...register("amtinWord", { required: "Amount in words is required" })}
                      className="mt-2"
                      data-testid="input-amount-words"
                    />
                    {errors.amtinWord && (
                      <p className="text-red-500 text-sm mt-1">{errors.amtinWord.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantRefundAmt" className="text-sm font-medium text-gray-700">
                      Tenant Refundable Amount (2 Months) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantRefundAmt"
                      type="number"
                      placeholder="Enter refundable amount"
                      {...register("tenantRefundAmt", { required: "Refundable amount is required" })}
                      className="mt-2"
                      data-testid="input-refund-amount"
                    />
                    {errors.tenantRefundAmt && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantRefundAmt.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tenantIncreaseAmt" className="text-sm font-medium text-gray-700">
                      Rent Increase After (11 months) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tenantIncreaseAmt"
                      type="number"
                      placeholder="Enter rent increase amount"
                      {...register("tenantIncreaseAmt", { required: "Rent increase amount is required" })}
                      className="mt-2"
                      data-testid="input-increase-amount"
                    />
                    {errors.tenantIncreaseAmt && (
                      <p className="text-red-500 text-sm mt-1">{errors.tenantIncreaseAmt.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="flex items-center gap-2"
                    data-testid="button-reset"
                  >
                    <RotateCcw size={16} />
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    data-testid="button-generate-agreement"
                  >
                    <Send size={16} />
                    Generate Agreement
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Form Confirmation Modal */}
      <FormConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelSubmit}
        onConfirm={handleConfirmSubmit}
      />
    </main>
  );
}
